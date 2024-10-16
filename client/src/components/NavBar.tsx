import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export function NavBar() {
  const navigate = useNavigate();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // Function to handle closing the dropdown after a selection
  const handleLinkClick = (path: string) => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
    navigate(path);
  };
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
          <details ref={detailsRef} className="dropdown">
            <summary className="text-black text-[24px]">Books</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-lilac text-black rounded-box w-52">
              <li>
                <button onClick={() => handleLinkClick('/newReviews')}>
                  Create a Review
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/reviews')}>
                  Reviews
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/newTbr')}>
                  Add to TBR
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/tbr')}>TBR</button>
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
