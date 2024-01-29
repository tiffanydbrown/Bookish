import { Outlet, Link } from 'react-router-dom';
import { Logo } from './Logo';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

export function Header() {
  return (
    <div>
      <header className="p-3  bg-anti-flash-white">
        <div className="signup text-cherry-red underline decoration-solid flex flex-wrap justify-end flex-row  ">
          <Link to="/signup">Sign Up</Link>
        </div>
        <div className="signup text-cherry-red underline decoration-solid flex flex-wrap justify-end flex-row  ">
          <Link to="/signin">Sign In</Link>
        </div>
        <Logo />
        <NavBar />
      </header>
      <Outlet />
      <Footer />
    </div>
  );
}
