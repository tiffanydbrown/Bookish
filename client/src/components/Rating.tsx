import { Review } from '../data';

type Props = {
  review?: Review;
};

export function RatingComponent({ review }: Props) {
  return (
    <div className="rating p-5 flex flex-wrap flex-row justify-center">
      <input type="radio" name="rating" className="rating-hidden" />
      <input
        type="radio"
        name="rating"
        value={1}
        defaultValue={review?.rating}
        className="mask mask-star-2 bg-yellow-300"
      />
      <input
        type="radio"
        name="rating"
        value={2}
        defaultValue={review?.rating}
        className="mask mask-star-2 bg-yellow-300"
      />
      <input
        type="radio"
        name="rating"
        value={3}
        defaultValue={review?.rating}
        className="mask mask-star-2 bg-yellow-300"
      />
      <input
        type="radio"
        name="rating"
        value={4}
        defaultValue={review?.rating}
        className="mask mask-star-2 bg-yellow-300"
      />
      <input
        type="radio"
        name="rating"
        value={5}
        defaultValue={review?.rating}
        className="mask mask-star-2 bg-yellow-300"
      />
    </div>
  );
}
