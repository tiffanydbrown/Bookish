import { BkReview } from '../components/BkReview';
import { BookInfo } from '../components/BookInfo';
import { RatingComponent } from '../components/Rating';
import { FormEvent } from 'react';

export function Review() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    // Make fetch call to database
    // try {
    //   const response = await fetch();
    //   if (!response.ok) throw new Error(`Bad Response ${response.status}`);
    //   //react routing navigate
    // } catch (error) {
    //   // setError(error);
    // }
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
