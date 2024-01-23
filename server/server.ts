/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
} from './lib/index.js';

const userId = 1;
const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/bookReview', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "bookReview"
    `;
    const result = await db.query(sql);
    const bookReview = result.rows;
    res.json(bookReview);
  } catch (err) {
    next(err);
  }
});

app.get('/api/bookReview/:bookReviewId', async (req, res, next) => {
  try {
    const reviewId = Number(req.params.bookReviewId);
    if (!Number.isInteger(reviewId) || reviewId <= 0) {
      throw new ClientError(400, `"reviewId" must be a positive integer`);
    }
    const sql = `
      select *
        from "bookReview"
        where "bookReviewId" = $1
    `;
    const params = [reviewId];
    const result = await db.query(sql, params);
    const bookReview = result.rows[0];
    if (!bookReview) {
      throw new ClientError(
        404,
        `Cannot find review with "reviewId" ${reviewId}`
      );
    }
    res.json(bookReview);
  } catch (err) {
    next(err);
  }
});

app.post('/api/bookReview', async (req, res, next) => {
  try {
    const {
      bookTitle,
      bookAuthor,
      series,
      publisher,
      genres,
      synopsis,
      review,
    } = req.body;
    if (!bookTitle) throw new ClientError(400, 'User did not input title');
    if (!bookAuthor) throw new ClientError(400, 'User did not input author');
    if (!series) throw new ClientError(400, 'User did not input series');
    if (!publisher) throw new ClientError(400, 'User did not input publisher');
    if (!genres) throw new ClientError(400, 'User did not input genres');
    if (!synopsis) throw new ClientError(400, 'User did not input synopsis');
    if (!review) throw new ClientError(400, 'User did not input review');

    const sql = `
      insert into "bookReview" ("bookTitle", "bookAuthor", "series", "publisher", "genres", "synopsis", "review", "reviewAuthor")
        values($1, $2, $3, $4, $5, $6, $7, $8)
      returning *;
    `;

    const params = [
      bookTitle,
      bookAuthor,
      series,
      publisher,
      genres,
      synopsis,
      review,
      1,
    ];
    const result = await db.query(sql, params);
    const bookReview = result.rows[0];
    res.json(bookReview);
  } catch (err) {
    next(err);
  }
});

app.put('/api/bookReview:bookReviewId', async (req, res, next) => {
  try {
    const bookReviewId = Number(req.params.bookReviewId);
    if (
      !Number.isInteger(bookReviewId) ||
      bookReviewId <= 0 ||
      Number.isNaN(bookReviewId)
    ) {
      throw new ClientError(400, `"bookReviewId" must be a positive integer`);
    }
    const {
      bookTitle,
      bookAuthor,
      series,
      publisher,
      genres,
      synopsis,
      review,
    } = req.body;
    if (!bookTitle) throw new ClientError(400, 'User did not input title');
    if (!bookAuthor) throw new ClientError(400, 'User did not input author');
    if (!series) throw new ClientError(400, 'User did not input series');
    if (!publisher) throw new ClientError(400, 'User did not input publisher');
    if (!genres) throw new ClientError(400, 'User did not input genres');
    if (!synopsis) throw new ClientError(400, 'User did not input synopsis');
    if (!review) throw new ClientError(400, 'User did not input review');

    const sql = `
      update "bookReview"
        set "bookTitle" = $1,
            "bookAuthor" = $2,
            "series" = $3,
            "publisher" = $4,
            "genres" = $5,
            "synopsis" = $6,
            "review" = $7,
            "reviewAuthor" = $8
        where "bookReviewId = $9
      returning *;
    `;
    const params = [
      bookTitle,
      bookAuthor,
      series,
      publisher,
      genres,
      synopsis,
      review,
      1,
      bookReviewId,
    ];
    const result = await db.query(sql, params);
    const bookReview = result.rows;
    res.json(bookReview);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/bookReview/:bookReviewId', async (req, res, next) => {
  try {
    const bookReviewId = Number(req.params.bookReviewId);
    if (
      !Number.isInteger(bookReviewId) ||
      bookReviewId <= 0 ||
      Number.isNaN(bookReviewId)
    ) {
      throw new ClientError(400, `"bookReviewId" must be a positive integer`);
    }

    const sql = `
      delete
        from "bookReview"
        where "bookReviewId" = $1
      returning *;
    `;

    const params = [bookReviewId];
    const result = await db.query(sql, params);
    const bookReview = result.rows[0];
    if (!bookReview) {
      throw new ClientError(
        404,
        `Cannot find bookReview with "bookReviewId" ${bookReviewId}`
      );
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */
app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
