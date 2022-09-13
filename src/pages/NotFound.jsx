import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <header className="notfound_header">
        <h1>
          The page you're looking for is not found, or your internet connection
          is not too good.
        </h1>
      </header>

      <main className="notfound_main">
        <p>Try again!</p>

        <div className="notfound_link">
          <Link to={"/"}>Go back home</Link>
        </div>
      </main>
    </>
  );
}

export default NotFound;
