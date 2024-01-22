export function NavBar() {
  return (
    <nav className=" bg-cherry-red">
      <div>
        <ul className="flex flex-wrap p-2 text-anti-flash-white  text-[24px] navLinks gap-5  ">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <details className="dropdown">
            <summary className="m-1 btn">Books</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <a href="/reviews">Reviews</a>
              </li>
              <li>
                <a href="/tbr">TBR</a>
              </li>
            </ul>
          </details>
        </ul>
      </div>
    </nav>
  );
}
