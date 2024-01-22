import { RatingComponent } from '../components/Rating';

export function Review() {
  return (
    <div className="container">
      <div>
        <img src="some image" />
      </div>
      <div>
        <label>
          Review: <input name="title" />
        </label>
        <label>
          Series: <input name="series" />
        </label>
        <label>
          Publisher: <input name="publisher" />
        </label>
        <label>
          Genre: <input name="genre" />
        </label>
        <span className="bg-fire-engine-red">my to-read shelf:</span>
        <br />
        <a
          href="https://www.goodreads.com/"
          title="to-read shelf"
          rel="nofollow">
          <img
            alt="to-read shelf"
            src="https://s.gr-assets.com/images/badge/badge1.jpg"
          />
        </a>
      </div>
      <RatingComponent />
    </div>
  );
}
