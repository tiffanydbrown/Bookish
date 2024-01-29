import { useState } from 'react';
import { Review } from '../data';

type Props = {
  review?: Review;
};

export function RatingComponent({ review }: Props) {
  const [value, setValue] = useState(review?.rating ?? 1);

  return (
    <div className="rating p-5 flex flex-wrap flex-row justify-center">
      <input type="hidden" name="rating" value={value} />
      <input
        type="radio"
        name="star"
        className="mask mask-star-2 bg-yellow-300"
        onChange={(e) => e.target.checked && setValue(1)}
        checked={value === 1}
      />
      <input
        type="radio"
        name="star"
        className="mask mask-star-2 bg-yellow-300"
        onChange={(e) => e.target.checked && setValue(2)}
        checked={value === 2}
      />
      <input
        type="radio"
        name="star"
        className="mask mask-star-2 bg-yellow-300"
        onChange={(e) => e.target.checked && setValue(3)}
        checked={value === 3}
      />
      <input
        type="radio"
        name="star"
        className="mask mask-star-2 bg-yellow-300"
        onChange={(e) => e.target.checked && setValue(4)}
        checked={value === 4}
      />
      <input
        type="radio"
        name="star"
        className="mask mask-star-2 bg-yellow-300"
        onChange={(e) => e.target.checked && setValue(5)}
        checked={value === 5}
      />
    </div>
  );
}
