import { Review } from '../data';

type BookProps = {
  review: Review;
};

function getDate() {
  const today = new Date();
  return today.toLocaleDateString();
}

export function PostInfo({ review }: BookProps) {
  const {
    reviewImage,
    bookTitle,
    bookAuthor,
    series,
    publisher,
    genres,
    synopsis,
  } = review;

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={reviewImage}
          className="max-w-sm rounded-lg shadow-2xl"
          alt={bookTitle}
        />
        <div>
          <h1 className="text-5xl text-black font-bold">Review: {bookTitle}</h1>
          <p className="date text-black">{getDate()}</p>
          <br />
          <label className="text-black">Title: {bookTitle}</label>
          <br />
          <label className="text-black">Author: {bookAuthor}</label>
          <br />
          <label className="text-black">Series: {series}</label>
          <br />
          <label className="text-black">Publisher: {publisher}</label>
          <br />
          <label className="text-black">Genre: {genres}</label>
          <br />
          <span className="text-black">Add to Goodreads:</span>
          <a
            href="https://www.goodreads.com/"
            title="to-read shelf"
            rel="nofollow">
            <img
              alt="to-read shelf"
              src="https://s.gr-assets.com/images/badge/badge1.jpg"
              className="goodreads p-2.5"
            />
          </a>
          <br />
          <p className="synopsis bg-lilac text-black rounded-3xl textarea-lg w-full max-w-lg">
            {synopsis}
          </p>
        </div>
      </div>
    </div>
  );
}
