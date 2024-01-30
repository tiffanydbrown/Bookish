import { useEffect, useState, useRef } from 'react';
import { PostInfo } from '../components/PostInfo';
import { fetchDeleteReview, fetchReview, type Review } from '../data';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PostReview } from '../components/PostReview';
import { ReviewRating } from '../components/ReviewRating';

export function Post() {
  const [post, setPost] = useState<Review>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const bookPost = useParams();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    async function loadReview() {
      try {
        if (!bookPost.id) throw new Error('No id');
        const post = await fetchReview(+bookPost.id);
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

  async function handleDelete() {
    if (!post) throw new Error('Should never happen');
    try {
      setIsLoading(true);
      await fetchDeleteReview(post.bookReviewId);
      navigate('/');
    } catch (error) {
      alert(`Error deleting entry: ${error}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-space-cadet">
      <PostInfo review={post} />
      <PostReview bookReview={post} />
      <br />
      <ReviewRating review={post} />
      <br />
      {bookPost.id && (
        <div className="delete flex flex-wrap justify-center pb-6 text-2xl underline text-fire-engine-red">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            disabled={isLoading}
            className="btn btn-ghost text-2xl"
            onClick={() => modalRef.current?.showModal()}>
            Delete Review
          </button>
          <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-anti-flash-white">
              <p className="py-4">Are You Sure You Want to Delete?</p>
              <div className="modal-action flex flex-wrap">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn mr-4 bg-cool-gray text-anti-flash-white">
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn bg-fire-engine-red text-anti-flash-white"
                    onClick={handleDelete}>
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
      <Link
        to={`/reviews/${bookPost.id}`}
        className="edit flex flex-wrap justify-center pb-6 text-2xl underline text-fire-engine-red">
        Edit Review
      </Link>
    </div>
  );
}
