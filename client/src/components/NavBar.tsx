import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <nav className=" bg-cherry-red">
      <div>
        <ul className="flex flex-wrap p-2 text-anti-flash-white  text-[24px] navLinks gap-5  ">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <details className="dropdown">
            <summary className="m-1 btn">Books</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <Link to="/reviews">Reviews</Link>
              </li>
              <li>
                <Link to="/tbr">TBR</Link>
              </li>
            </ul>
          </details>
        </ul>
      </div>
    </nav>
  );
}
