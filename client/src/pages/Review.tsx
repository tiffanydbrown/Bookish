import { useNavigate, useParams } from 'react-router-dom';
import { BkReview } from '../components/BkReview';
import { BookInfo } from '../components/BookInfo';
import { RatingComponent } from '../components/Rating';
import { FormEvent, useState, useEffect } from 'react';
import {
  fetchCreateReview,
  UnsavedReview,
  fetchReview,
  fetchUpdateReview,
  Review,
} from '../data';

export function ReviewPage() {
  const navigate = useNavigate();
  const bookEdit = useParams();
  const [post, setPost] = useState<Review>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function loadReview() {
      try {
        if (!bookEdit.id) throw new Error('No id');
        const post = await fetchReview(+bookEdit.id);
        setPost(post);
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
  if (error || !post)
    return (
      <div>
        Error Loading Review:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    try {
      if (bookEdit.id) {
        await fetchUpdateReview(formJson as unknown as Review);
      } else {
        await fetchCreateReview(formJson as unknown as UnsavedReview);
      }
      navigate('/');
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <div className="bg-space-cadet">
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="bookReviewId" value={bookEdit.id} />
        <BookInfo review={post} />
        <BkReview review={post} />
        <RatingComponent review={post} />
        <div className="save p-10">
          <button className="btn bg-fire-engine-red text-anti-flash-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
