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
    const review = result.rows[0];
    if (!review) {
      throw new ClientError(
        404,
        `Cannot find review with "reviewId" ${reviewId}`
      );
    }
    res.json(review);
  } catch (err) {
    next(err);
  }
});

app.post('/api/bookReview', async (req, res, next) => {
  try {
    const { name, course, score } = req.body;
    if (!name) throw new ClientError(400, 'User did not input name');
    if (!course) throw new ClientError(400, 'User did not input course');
    if (!score) throw new ClientError(400, 'User did not input score');
    if (!Number.isInteger(score) || +score < 0 || score > 100) {
      throw new ClientError(400, 'Score is not an integer between 0 and 100');
    }

    const sql = `
      insert into "grades" ("course", "name", "score")
        values($1, $2, $3)
      returning *;
    `;

    const params = [course, name, +score];
    const result = await db.query(sql, params);
    const grade = result.rows[0];
    res.json(grade);
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
