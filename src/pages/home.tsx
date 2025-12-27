
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



export default function HomePage() {
    return (
        <div>
            <Searc/>
            </div>
    )
}