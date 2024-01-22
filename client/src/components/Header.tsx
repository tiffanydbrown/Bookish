import { Logo } from './Logo';

export function Header() {
  return (
    <header className="p-3  bg-anti-flash-white">
      <div className="signIn text-cherry-red flex flex-wrap justify-end flex-row  ">
        <a href="/sign">Sign Up / Sign In</a>
      </div>
      <Logo />
    </header>
  );
}
