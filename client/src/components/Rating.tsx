export function RatingComponent() {
  return (
    <div className="rating p-5 flex flex-wrap flex-row justify-center">
      <input
        type="radio"
        name="rating"
        value={1}
        className="mask mask-star-2 bg-yellow-300"
      />
      <input
        type="radio"
        name="rating"
        value={2}
        className="mask mask-star-2 bg-yellow-300"
      />
      <input
        type="radio"
        name="rating"
        value={3}
        className="mask mask-star-2 bg-yellow-300"
      />
      <input
        type="radio"
        name="rating"
        value={4}
        className="mask mask-star-2 bg-yellow-300"
      />
      <input
        type="radio"
        name="rating"
        value={5}
        className="mask mask-star-2 bg-yellow-300"
      />
    </div>
  );
}
