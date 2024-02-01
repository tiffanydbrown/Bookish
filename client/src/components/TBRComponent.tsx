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
        <label className="text-cherry-red p-2">
          Photo URL:{' '}
          <input
            type="text"
            value={photoUrl}
            name="TBRImage"
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
              name="bookTitleTBR"
              defaultValue={tbr?.bookTitleTBR}
              className="input input-ghost w-full max-w-xs border-cherry-red"
            />
          </label>
          <label className="text-cherry-red">
            Author:{' '}
            <input
              type="text"
              placeholder="Type here"
              name="bookAuthorTBR"
              defaultValue={tbr?.bookAuthorTBR}
              className="input input-ghost w-full max-w-xs border-cherry-red"
            />
          </label>
          <label className="text-cherry-red">
            Release Date:{' '}
            <input
              type="text"
              placeholder="Type here"
              name="releaseDate"
              defaultValue={
                tbr?.releaseDate ? tbr.releaseDate.toString() : undefined
              }
              className="input input-ghost w-full max-w-xs border-cherry-red"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
