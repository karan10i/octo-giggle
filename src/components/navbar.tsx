import './nav.css'
import Searc from './search'
const Navbar=()=>{
    return( <nav className="upbar" role="navigation">
       <div className="navbar-center">
    <ul className="nav-links">
      <li>
        <a href="/home">home</a>
      </li>
      <li>
        <a href="/movies">movies</a>
      </li>
      <li>
        <a href="/series">series</a>
      </li>
      <li>
      <Searc/>
      </li>
    </ul>
  </div>
    </nav>)
}
export default Navbar;
