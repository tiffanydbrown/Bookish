import { useState } from 'react';
import { Review } from '../data';

function getDate() {
  const today = new Date();
  return today.toLocaleDateString();
}

type Props = {
  review?: Review;
};

export function BookInfo({ review }: Props) {
  const [photoUrl, setPhotoUrl] = useState(review?.reviewImage ?? '');

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={photoUrl || '/images/placeholder-image-square.jpg'}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <label className="text-anti-flash-white">
          Photo URL:{' '}
          <input
            type="text"
            value={photoUrl}
            name="reviewImage"
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="input input-ghost w-full max-w-xs"
          />
        </label>
        <div>
          <h1 className="text-5xl text-anti-flash-white font-bold">Review:</h1>
          <label className="text-anti-flash-white">
            Date: <p className="date">{getDate()}</p>
          </label>
          <br />
          <label className="text-anti-flash-white">
            Title:{' '}
            <input
              type="text"
              placeholder="Type here"
              name="bookTitle"
              defaultValue={review?.bookTitle}
              className="input input-ghost w-full max-w-xs"
            />
          </label>
          <br />
          <label className="text-anti-flash-white">
            Author:{' '}
            <input
              type="text"
              placeholder="Type here"
              name="bookAuthor"
              defaultValue={review?.bookAuthor}
              className="input input-ghost w-full max-w-xs"
            />
          </label>
          <br />
          <label className="text-anti-flash-white">
            Series:{' '}
            <input
              type="text"
              placeholder="Type here"
              name="series"
              defaultValue={review?.series}
              className="input input-ghost w-full max-w-xs"
            />
          </label>
          <br />
          <label className="text-anti-flash-white">
            Publisher:{' '}
            <input
              type="text"
              placeholder="Type here"
              name="publisher"
              defaultValue={review?.publisher}
              className="input input-ghost w-full max-w-md"
            />
          </label>
          <br />
          <label className="text-anti-flash-white">
            Genre:{' '}
            <input
              type="text"
              placeholder="Type here"
              name="genres"
              defaultValue={review?.genres}
              className="input input-ghost w-full max-w-xs"
            />
          </label>
          <br />
          <span className="text-anti-flash-white">to-read shelf:</span>
          <a
            href="https://www.goodreads.com/"
            title="to-read shelf"
            rel="nofollow">
            <img
              alt="to-read shelf"
              src="https://s.gr-assets.com/images/badge/badge1.jpg"
            />
          </a>
          <textarea
            placeholder="Synopsis"
            name="synopsis"
            defaultValue={review?.synopsis}
            className="textarea resize textarea-bordered textarea-lg w-full max-w-xs"></textarea>
        </div>
      </div>
    </div>
  );
}
