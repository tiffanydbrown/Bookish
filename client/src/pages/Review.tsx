import { useNavigate } from 'react-router-dom';
import { BkReview } from '../components/BkReview';
import { BookInfo } from '../components/BookInfo';
import { RatingComponent } from '../components/Rating';
import { FormEvent } from 'react';
import {
  fetchCreateReview,
  UnsavedReview,
  fetchUpdateReview,
  Review,
} from '../data';

type Props = {
  review?: Review;
  onSubmit: () => void;
};

export function ReviewPage({ review, onSubmit }: Props) {
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    try {
      if (review) {
        await fetchUpdateReview({ ...review });
      } else {
        await fetchCreateReview(formJson as unknown as UnsavedReview);
      }
      navigate('/');
    } catch (error) {
      alert(error);
      console.error(error);
    }
    onSubmit();
  }

  return (
    <div className="bg-space-cadet">
      <form onSubmit={handleSubmit}>
        <BookInfo />
        <BkReview
          onSubmit={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
        <RatingComponent
          onSubmit={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
        <div className="save p-10">
          <button className="btn bg-fire-engine-red text-anti-flash-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
