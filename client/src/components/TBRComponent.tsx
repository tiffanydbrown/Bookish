import { useState } from 'react';
import { TBR } from '../data';

type Props = {
  tbr?: TBR;
};

export function TBRComponent({ tbr }: Props) {
  const [photoUrl, setPhotoUrl] = useState(tbr?.TBRImage ?? '');

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
        <label className="text-black p-2">
          Photo URL:{' '}
          <input
            type="text"
            value={photoUrl}
            name="TBRImage"
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="input input-ghost w-full max-w-xs border-dark-lilac"
          />
        </label>
        <div className="card-body items-center text-center">
          <label className="text-black text-2xl">
            Title:{' '}
            <input
              type="text"
              placeholder="Type here"
              name="bookTitleTBR"
              defaultValue={tbr?.bookTitleTBR}
              className="input input-ghost w-full max-w-xs border-dark-lilac"
            />
          </label>
          <label className="text-black">
            Author:{' '}
            <input
              type="text"
              placeholder="Type here"
              name="bookAuthorTBR"
              defaultValue={tbr?.bookAuthorTBR}
              className="input input-ghost w-full max-w-xs border-dark-lilac"
            />
          </label>
          <label className="text-black">
            Release Date:{' '}
            <input
              type="text"
              placeholder="Type here"
              name="releaseDate"
              defaultValue={
                tbr?.releaseDate ? tbr.releaseDate.toString() : undefined
              }
              className="input input-ghost w-full max-w-xs border-dark-lilac"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
