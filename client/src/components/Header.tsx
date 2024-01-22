import 'tailwindcss/tailwind.css';

export function Header() {
  return (
    <header className="p-8 flex flex-wrap justify-center flex-row bg-anti-flash-white">
      <div>
        <img src="client/src/assets/Bookish.png" alt="Bookish Logo" />
      </div>
      <div className="signIn text-cherry-red ">
        <a href="/sign">Sign Up / Sign In</a>
      </div>
    </header>
  );
}
