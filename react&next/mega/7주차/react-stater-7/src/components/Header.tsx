import { Link } from "react-router-dom";

export default function Header() {
  const handleClick = (event) => {
    event.preventDefault();

    // const state = {};
    // const title = "";
    // const url = "/about";
    // history.pushState(state, title, url);
    //
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              // onClick={handleClick}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              // onClick={handleClick}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
