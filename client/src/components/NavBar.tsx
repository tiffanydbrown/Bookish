import { useState } from 'react';
import 'tailwindcss/tailwind.css';

export function NavBar() {
  // state for open or closed
  const [isOpen, setIsOpen] = useState(true);

  function handleClick(): void {
    setIsOpen(false);
  }
  return (
    <nav className="flex flex-wrap flex-row p-3   text-anti-flash-white  text-[24px] bg-cherry-red">
      <div>
        <ul className="navLinks columns-2 gap-1">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            {/* onclick */}
            <div onClick={handleClick}>Books</div>
          </li>
          <div className={isOpen ? 'is-open' : ''}>
            {/* conditional rendering around entire div */}
            <a href="/reviews">Reviews</a>
            <a href="/tbr">To Be Read</a>
          </div>
        </ul>
      </div>
    </nav>
  );
}
