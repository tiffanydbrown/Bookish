import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <nav className="bg-lilac">
      <div>
        <ul className="flex flex-wrap p-2 text-black text-[24px] navLinks gap-5">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <details className="dropdown">
            <summary className="text-black text-[24px]">Books</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-lilac text-black rounded-box w-52">
              <li>
                <Link to="/newReviews">Create a Review</Link>
              </li>
              <li>
                <Link to="/reviews">Reviews</Link>
              </li>
              <li>
                <Link to="/newTbr">Add to TBR</Link>
              </li>
              <li>
                <Link to="/tbr">TBR</Link>
              </li>
            </ul>
          </details>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
