import { useState } from 'react';
import { Review } from '../data';

type Props = {
  review?: Review;
};

export function TBRComponent({ review }: Props) {
  const [photoUrl, setPhotoUrl] = useState(review?.reviewImage ?? '');

  return (
    <div className="tbr flex flex-wrap m-8">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={photoUrl || '/images/placeholder-image-square.jpg'}
            alt="book"
            className="rounded-xl"
          />
        </figure>
        <label className="text-cherry-red p-2">
          Photo URL:{' '}
          <input
            type="text"
            value={photoUrl}
            name="tbrImage"
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="input input-ghost w-full max-w-xs border-cherry-red"
          />
        </label>
        <div className="card-body items-center text-center">
          <label className="text-cherry-red text-2xl">
            Title:{' '}
            <input
              type="text"
              placeholder="Type here"
              name="bookTitle"
              defaultValue={review?.bookTitle}
              className="input input-ghost w-full max-w-xs border-cherry-red"
            />
          </label>
          <label className="text-cherry-red">
            Author:{' '}
            <input
              type="text"
              placeholder="Type here"
              name="bookAuthor"
              defaultValue={review?.bookAuthor}
              className="input input-ghost w-full max-w-xs border-cherry-red"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
