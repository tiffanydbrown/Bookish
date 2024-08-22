import { useEffect, useState } from 'react';
import { fetchAuthorReview, type Review } from '../data';
import { Link, useParams } from 'react-router-dom';

export function UserReviewSnippet() {
  const [reviews, setReviews] = useState<Review[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const reviewAuthor = useParams();

  useEffect(() => {
    async function loadReview() {
      try {
        if (!reviewAuthor) throw new Error('No Book Author');
        const reviews = await fetchAuthorReview();
        setReviews(reviews);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadReview();
  }, [reviewAuthor]);

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
        {reviews?.map((review, index) => (
          <div key={index} className="hero-content flex-col lg:flex-row">
            <ReviewCard review={review} />
            <button className="btn bg-lilac text-black">
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
