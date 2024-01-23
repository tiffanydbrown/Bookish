export function BkReview() {
  return (
    <>
      <div className="bg-space-cadet flex flex-wrap flex-row justify-center">
        <textarea
          placeholder="Review"
          name="review"
          className="bg-anti-flash-white resize textarea textarea-bordered textarea-lg w-full max-w-2xl"></textarea>
      </div>
      <br />
      <div className="px-20">
        <label className="text-anti-flash-white">
          Author:{' '}
          <input
            type="text"
            placeholder="Type here"
            name="reviewAuthor"
            className="input input-ghost w-full max-w-xs"
          />
        </label>
      </div>
    </>
  );
}
