import { Review } from '../data';

type ReviewProps = {
  bookReview: Review;
};

export function PostReview({ bookReview }: ReviewProps) {
  const { review } = bookReview;

  return (
    <>
      <div className="bg-space-cadet flex flex-wrap flex-row justify-center">
        <p className="bg-anti-flash-white resize textarea textarea-bordered textarea-lg w-full max-w-2xl">
          {review}
        </p>
      </div>
    </>
  );
}
