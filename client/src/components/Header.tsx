import { Outlet } from 'react-router-dom';
import { Logo } from './Logo';
import { NavBar } from './NavBar';

export function Header() {
  return (
    <div>
      <header className="p-3  bg-anti-flash-white">
        <div className="signIn text-cherry-red flex flex-wrap justify-end flex-row  ">
          <a href="/sign">Sign Up / Sign In</a>
        </div>
        <Logo />
        <NavBar />
      </header>
      <Outlet />
    </div>
  );
}
