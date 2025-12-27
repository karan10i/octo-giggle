import './nav.css'
import React, { useState } from "react";
import { TMDB } from "@lorenzopant/tmdb";

const tmdb = new TMDB(import.meta.env.VITE_TMDB_ACCESS_TOKEN);

function Searc(){
     const [query, setQuery] = useState("");
    async function sm(q){
        const movies = await tmdb.search.movies({query:q});
        console.log(movies);
    }
    return(
        <div className="search-box"> 
            <input 
                type="text" 
                className="search-input" 
                placeholder="Search for movies or series..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button 
                className="search-button" 
                onClick={() => sm(query)}
            >
                Search
            </button>
        </div>
)
}
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
