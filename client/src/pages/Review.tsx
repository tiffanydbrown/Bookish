import { useNavigate } from 'react-router-dom';
import { BkReview } from '../components/BkReview';
import { BookInfo } from '../components/BookInfo';
import { RatingComponent } from '../components/Rating';
import { FormEvent } from 'react';

export function Review() {
  const navigate = useNavigate();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    // Make fetch call to database

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formJson),
      };
      const response = await fetch('/api/bookReview', options);
      if (!response.ok) throw new Error(`Bad Response ${response.status}`);
      //react routing navigate
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="bg-space-cadet">
      <form onSubmit={handleSubmit}>
        <BookInfo />
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
