import { useNavigate } from 'react-router-dom';
import { BkReview } from '../components/BkReview';
import { BookInfo } from '../components/BookInfo';
import { RatingComponent } from '../components/Rating';
import { FormEvent } from 'react';
import { fetchCreateReview, UnsavedReview } from '../data';

export function ReviewPage() {
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    try {
      await fetchCreateReview(formJson as unknown as UnsavedReview);
      navigate('/');
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <div className="bg-space-cadet">
      <form onSubmit={handleSubmit}>
        <BookInfo onSubmit={() => undefined} review={Review} />
        <BkReview />
        <RatingComponent />
        <div className="save p-10">
          <button className="btn bg-fire-engine-red text-anti-flash-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
