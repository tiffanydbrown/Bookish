import { Outlet } from 'react-router-dom';
import { Logo } from './Logo';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

export function Header() {
  return (
    <div>
      <header className="p-3  bg-anti-flash-white">
        <Logo />
        <NavBar />
      </header>
      <Outlet />
      <Footer />
    </div>
  );
}
