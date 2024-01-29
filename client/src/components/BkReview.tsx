import { Review } from '../data';

type Props = {
  review?: Review;
  onSubmit: () => void;
};

export function BkReview({ review }: Props) {
  return (
    <>
      <div className="bg-space-cadet flex flex-wrap flex-row justify-center">
        <textarea
          placeholder="Review"
          name="review"
          defaultValue={review?.bookTitle}
          className="bg-anti-flash-white resize textarea textarea-bordered textarea-lg w-full max-w-2xl"></textarea>
      </div>
    </>
  );
}
