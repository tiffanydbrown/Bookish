export function AboutComponent() {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            'url(https://newmobility.com/wp-content/uploads/2021/06/bookstore.jpg)',
        }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">About Bookish</h1>
            <p className="mb-5">
              Bookish provides users with the ability to journal about the books
              they read and have their reviews used by other users. Users can
              also create a list of books they would like to read (TBR), so that
              they have a shopping list available for their next trip to their
              favorite book store.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
