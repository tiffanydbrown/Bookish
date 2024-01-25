import { Review } from '../data';

type RatingProps = {
  review: Review;
};

export function ReviewRating({ review }: RatingProps) {
  const { rating } = review;
  const star: number[] = [];

  for (let i = 1; i <= rating; i++) {
    star.push(i);
  }

  const starRating = star.map((star) => (
    <div key={star} className="rating p-3 mask mask-star-2 bg-yellow-300"></div>
  ));
  return (
    <div className="flex flex-wrap flex-row justify-center">{starRating}</div>
  );
}
