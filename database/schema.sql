set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "bookReview" (
  "bookReviewId" serial PRIMARY KEY,
  "bookTitle" text,
  "bookAuthor" text,
  "date" date,
  "series" text,
  "publisher" text,
  "genres" text,
  "synopsis" text,
  "review" text,
  "reviewAuthor" int
);

CREATE TABLE "user" (
  "userId" serial PRIMARY KEY,
  "firstName" text,
  "lastName" text,
  "userName" text,
  "hashedPassword" text
);

CREATE TABLE "booksTBR" (
  "booksTBRId" serial PRIMARY KEY,
  "bookTitleTBR" text,
  "bookAuthorTBR" text,
  "series" text,
  "publisher" text,
  "genres" text,
  "releaseDate" integer,
  "synopsis" text,
  "userID" integer
);

ALTER TABLE "bookReview" ADD FOREIGN KEY ("reviewAuthor") REFERENCES "user" ("userId");

ALTER TABLE "booksTBR" ADD FOREIGN KEY ("userID") REFERENCES "user" ("userId");
