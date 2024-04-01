import { Link } from "react-router-dom";
import ShoppingBag from "./ShoppingBag";
import "../styles/components/Header.scss";
import { useState } from "react";

const Header = ({ activeLink, setActiveLink }) => {
  const [isHamNavOpen, setIsHamNavOpen] = useState(false);

  const toggleHamburger = () => {
    setIsHamNavOpen(!isHamNavOpen);
  };

  return (
    <nav>
      <div className="nav-line">
        <button
          id="hamburger"
          aria-expanded={isHamNavOpen === true ? "true" : "false"}
          onClick={toggleHamburger}
        >
          &#9776;
        </button>
        <Link className="nav-title" to="/" onClick={() => setActiveLink("")}>
          <p>Sparkles</p>
        </Link>
        <ShoppingBag hamNav={true} setActiveLink={setActiveLink} />
      </div>
      <div className={isHamNavOpen === true ? "nav showNav" : "nav"}>
        <Link
          className="nav-title d-nav"
          to="/"
          onClick={() => setActiveLink("")}
        >
          <p>Sparkles</p>
        </Link>
        <ul className="nav-list">
          <li onClick={() => setActiveLink("all")}>
            <Link
              to="/all"
              onClick={toggleHamburger}
              className={activeLink === "all" ? "active-link" : undefined}
            >
              All
            </Link>
          </li>
          <li onClick={() => setActiveLink("new")}>
            <Link
              to="/new"
              onClick={toggleHamburger}
              className={activeLink === "new" ? "active-link" : undefined}
            >
              New
            </Link>
          </li>
          <li onClick={() => setActiveLink("luxury")}>
            <Link
              to="/luxury"
              onClick={toggleHamburger}
              className={activeLink === "luxury" ? "active-link" : undefined}
            >
              Luxury
            </Link>
          </li>
          <li onClick={() => setActiveLink("gifts")}>
            <Link
              to="/gifts"
              onClick={toggleHamburger}
              className={activeLink === "gifts" ? "active-link" : undefined}
            >
              Gifts
            </Link>
          </li>
          <li onClick={() => setActiveLink("sale")}>
            <Link
              to="/sale"
              onClick={toggleHamburger}
              className={activeLink === "sale" ? "active-link" : undefined}
            >
              Sale
            </Link>
          </li>
        </ul>
        <ShoppingBag hamNav={false} setActiveLink={setActiveLink} />
      </div>
    </nav>
  );
};

export default Header;
