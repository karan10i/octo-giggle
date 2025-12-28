import { Link } from "react-router-dom";
import "./nav.css";
import Searc from "./search";

const Navbar = () => {
  return (
    <nav className="upbar" role="navigation">
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <Link to="/">home</Link> {/* Use Link for navigation */}
          </li>
          <li>
            <Link to="/movies">movies</Link>
          </li>
          <li>
            <Link to="/series">series</Link>
          </li>
          <li>
            <Searc />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
