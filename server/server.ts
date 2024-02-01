/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import {
  ClientError,
  authMiddleware,
  defaultMiddleware,
  errorMiddleware,
} from './lib/index.js';

type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};

type Auth = {
  username: string;
  password: string;
};

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;

const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }

    const hashedPassword = await argon2.hash(password);
    const sql = `insert into "user"("userName", "hashedPassword")
    values ($1, $2)
    returning "userId", "userName", "createdAt"`;
    const params = [username, hashedPassword];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }

    const sql = `select "userId", "hashedPassword" from "user" where "userName" = $1`;
    const params = [username];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;

    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, hashKey);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

app.get('/api/bookReview', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "bookReview"
        order by "date" desc
        limit 5
    `;
    const result = await db.query(sql);
    const bookReview = result.rows;
    res.json(bookReview);
  } catch (err) {
    next(err);
  }
});

app.get(
  '/api/reviewAuthor/bookReview',
  authMiddleware,
  async (req, res, next) => {
    try {
      const sql = `
      select *
        from "bookReview"
        where "reviewAuthor" = $1
        order by "date" desc
    `;

      const params = [req.user?.userId];
      const result = await db.query(sql, params);
      const bookReview = result.rows;
      res.json(bookReview);
    } catch (err) {
      next(err);
    }
  }
);

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

app.post('/api/bookReview', authMiddleware, async (req, res, next) => {
  try {
    const {
      bookTitle,
      bookAuthor,
      series,
      publisher,
      genres,
      synopsis,
      review,
      reviewImage,
      rating,
    } = req.body;
    if (!bookTitle) throw new ClientError(400, 'User did not input title');
    if (!bookAuthor) throw new ClientError(400, 'User did not input author');
    if (!series) throw new ClientError(400, 'User did not input series');
    if (!publisher) throw new ClientError(400, 'User did not input publisher');
    if (!genres) throw new ClientError(400, 'User did not input genres');
    if (!synopsis) throw new ClientError(400, 'User did not input synopsis');
    if (!review) throw new ClientError(400, 'User did not input review');
    if (!reviewImage) throw new ClientError(400, 'User did not input image');
    if (!rating) throw new ClientError(400, 'User did not input rating');

    const sql = `
      insert into "bookReview" ("bookTitle", "bookAuthor", "series", "publisher", "genres", "synopsis", "review", "reviewImage", "rating", "reviewAuthor")
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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
      reviewImage,
      rating,
      req.user?.userId,
    ];
    const result = await db.query(sql, params);
    const bookReview = result.rows[0];
    res.json(bookReview);
  } catch (err) {
    next(err);
  }
});

app.post('/api/booksTBR', authMiddleware, async (req, res, next) => {
  try {
    const { bookTitleTBR, bookAuthorTBR, TBRImage, releaseDate } = req.body;
    if (!bookTitleTBR) throw new ClientError(400, 'User did not input title');
    if (!bookAuthorTBR) throw new ClientError(400, 'User did not input author');
    if (!TBRImage) throw new ClientError(400, 'User did not input image');
    if (!releaseDate)
      throw new ClientError(400, 'User did not input release date');

    const sql = `
      insert into "booksTBR" ("bookTitleTBR", "bookAuthorTBR", "TBRImage", "releaseDate", "userID")
        values($1, $2, $3, $4, $5)
      returning *;
    `;

    const params = [
      bookTitleTBR,
      bookAuthorTBR,
      TBRImage,
      releaseDate,
      req.user?.userId,
    ];
    const result = await db.query(sql, params);
    const booksTBR = result.rows[0];
    res.json(booksTBR);
  } catch (err) {
    next(err);
  }
});

app.put(
  '/api/bookReview/:bookReviewId',
  authMiddleware,
  async (req, res, next) => {
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
        reviewImage,
        rating,
      } = req.body;
      if (!bookTitle) throw new ClientError(400, 'User did not input title');
      if (!bookAuthor) throw new ClientError(400, 'User did not input author');
      if (!series) throw new ClientError(400, 'User did not input series');
      if (!publisher)
        throw new ClientError(400, 'User did not input publisher');
      if (!genres) throw new ClientError(400, 'User did not input genres');
      if (!synopsis) throw new ClientError(400, 'User did not input synopsis');
      if (!review) throw new ClientError(400, 'User did not input review');
      if (!reviewImage) throw new ClientError(400, 'User did not input image');
      if (!rating) throw new ClientError(400, 'User did not input rating');

      const sql = `
      update "bookReview"
        set "bookTitle" = $1,
            "bookAuthor" = $2,
            "series" = $3,
            "publisher" = $4,
            "genres" = $5,
            "synopsis" = $6,
            "review" = $7,
            "reviewImage" = $8,
            "rating" = $9,
            "reviewAuthor" = $10
        where "bookReviewId" = $11
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
        reviewImage,
        rating,
        req.user?.userId,
        bookReviewId,
      ];
      const result = await db.query(sql, params);
      const bookReview = result.rows;
      res.json(bookReview);
    } catch (err) {
      next(err);
    }
  }
);

app.put('/api/booksTBR/:booksTBRId', authMiddleware, async (req, res, next) => {
  try {
    const booksTBRId = Number(req.params.booksTBRId);
    if (
      !Number.isInteger(booksTBRId) ||
      booksTBRId <= 0 ||
      Number.isNaN(booksTBRId)
    ) {
      throw new ClientError(400, `"booksTBRId" must be a positive integer`);
    }
    const { bookTitleTBR, bookAuthorTBR, TBRImage, releaseDate } = req.body;
    if (!bookTitleTBR) throw new ClientError(400, 'User did not input title');
    if (!bookAuthorTBR) throw new ClientError(400, 'User did not input author');
    if (!TBRImage) throw new ClientError(400, 'User did not input image');
    if (!releaseDate)
      throw new ClientError(400, 'User did not input release date');

    const sql = `
      update "booksTBR"
        set "bookTitleTBR" = $1,
            "bookAuthorTBR" = $2,
            "TBRImage" = $3,
            "releaseDate" = $4
        where "booksTBRId" = $5
      returning *;
    `;
    const params = [
      bookTitleTBR,
      bookAuthorTBR,
      TBRImage,
      releaseDate,
      req.user?.userId,
      booksTBRId,
    ];
    const result = await db.query(sql, params);
    const bookTBR = result.rows;
    res.json(bookTBR);
  } catch (err) {
    next(err);
  }
});

app.delete(
  '/api/bookReview/:bookReviewId',
  authMiddleware,
  async (req, res, next) => {
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
        where "bookReviewId" = $1 and "reviewAuthor" = $2
      returning *;
    `;

      const params = [bookReviewId, req.user?.userId];
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
  }
);

app.delete(
  '/api/booksTBR/:booksTBRId',
  authMiddleware,
  async (req, res, next) => {
    try {
      const booksTBRId = Number(req.params.booksTBRId);
      if (
        !Number.isInteger(booksTBRId) ||
        booksTBRId <= 0 ||
        Number.isNaN(booksTBRId)
      ) {
        throw new ClientError(400, `"bookReviewId" must be a positive integer`);
      }

      const sql = `
      delete
        from "booksTBR"
        where "booksTBRId" = $1
      returning *;
    `;

      const params = [booksTBRId, req.user?.userId];
      const result = await db.query(sql, params);
      const bookTBR = result.rows[0];
      if (!bookTBR) {
        throw new ClientError(
          404,
          `Cannot find bookReview with "bookReviewId" ${booksTBRId}`
        );
      }
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);
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
