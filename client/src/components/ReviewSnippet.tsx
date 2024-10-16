import { useEffect, useState } from 'react';
import { fetchHome, type Review } from '../data';
import { Link } from 'react-router-dom';

export function ReviewSnippet() {
  const [reviews, setReviews] = useState<Review[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function loadReview() {
      try {
        const reviews = await fetchHome();
        setReviews(reviews);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadReview();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error Loading Reviews:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  return (
    <div className="container mx-auto">
      <div className="min-h-40  bg-anti-flash-white rounded-3xl">
        {reviews?.map((review) => (
          <div
            key={review.bookReviewId}
            className="hero-content flex-col lg:flex-row">
            <ReviewCard review={review} />
            <button className="btn bg-lilac text-black hover:bg-anti-flash-white hover:text-black">
              <Link to={`/post/${review.bookReviewId}`}>Read More</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

type CardProps = {
  review: Review;
};

function ReviewCard({ review }: CardProps) {
  const { reviewImage, bookTitle, bookAuthor, synopsis } = review;
  return (
    <>
      <img
        src={reviewImage}
        className="max-w-sm size-60 rounded-lg shadow-2xl"
        alt={bookTitle}
      />
      <div>
        <h1 className="text-5xl font-bold">Review: {bookTitle}</h1>
        <h2 className="text-xl font-bold">Author: {bookAuthor}</h2>
        <p className="py-6">{synopsis}</p>
      </div>
    </>
  );
}
