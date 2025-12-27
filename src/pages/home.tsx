import { useState } from "react";
import { TMDB } from "@lorenzopant/tmdb";

// Initialize TMDB with your API key
const tmdb = new TMDB({
    apiKey: process.env.REACT_APP_TMDB_ACCESS_TOKEN, // Ensure your .env file has this variable
});

function Searc() {
    const [query, setQuery] = useState(""); // State to store the search query
    const [movies, setMovies] = useState([]); // State to store the fetched movies

    const handleSearch = async () => {
        try {
            const response = await tmdb.search.movies({ query }); // Fetch movies based on the query
            setMovies(response.results); // Store the results in state
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    return (
        <div>
            <div className="search-box">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search for movies or series..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Update query state on input change
                />
                <button className="search-button" onClick={handleSearch}>
                    Search
                </button>
            </div>
            <div className="movies-section">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <h3>{movie.title}</h3>
                            <p>{movie.overview}</p>
                        </div>
                    ))
                ) : (
                    <p>No movies found. Try searching for something!</p>
                )}
            </div>
        </div>
    );
}

export default function HomePage() {
    return (
        <div>
            <Searc />
        </div>
    );
}