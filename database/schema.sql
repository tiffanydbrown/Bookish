set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "bookReview" (
  "bookReviewId" serial PRIMARY KEY,
  "bookTitle" text,
  "bookAuthor" text,
  "date" date default now(),
  "series" text,
  "publisher" text,
  "genres" text,
  "synopsis" text,
  "review" text,
  "reviewAuthor" int,
  "reviewImage" text,
  "rating" smallint not null check (rating between 1 and 5)
);

CREATE TABLE "user" (
  "userId" serial PRIMARY KEY,
  "userName" text not null,
  "hashedPassword" text not null,
  "createdAt" timestamptz(6) not null default now(),
  unique ("userName")
);

CREATE TABLE "booksTBR" (
  "booksTBRId" serial PRIMARY KEY,
  "bookTitleTBR" text,
  "bookAuthorTBR" text,
  "releaseDate" Date not null,
  "TBRImage" text,
  "userID" integer
);

ALTER TABLE "bookReview" ADD FOREIGN KEY ("reviewAuthor") REFERENCES "user" ("userId");

ALTER TABLE "booksTBR" ADD FOREIGN KEY ("userID") REFERENCES "user" ("userId");
