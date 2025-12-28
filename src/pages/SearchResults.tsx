import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { TMDB } from "@lorenzopant/tmdb";
import Search from "../components/search";

const tmdb = new TMDB(import.meta.env.VITE_TMDB_ACCESS_TOKEN);

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const query = searchParams.get("query") || "";

    useEffect(() => {
        if (!query.trim()) {
            navigate("/");
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            setError(null);
            try {
                const results = await tmdb.search.movies({ query });
                if (results && Array.isArray(results)) {
                    setMovies(results);
                } else if (results && results.results) {
                    setMovies(results.results);
                } else {
                    setMovies([]);
                }
            } catch (err) {
                setError("Failed to fetch search results. Please try again.");
                console.error("Error fetching movies:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query, navigate]);

    return (
        <div>
            <Search />
            <div className="search-results-container">
                <h1>Search Results for "{query}"</h1>

                {loading && <p className="loading">Loading...</p>}

                {error && <p className="error">{error}</p>}

                {!loading && movies.length === 0 && !error && (
                    <p className="no-results">No movies found for "{query}"</p>
                )}

                {!loading && movies.length > 0 && (
                    <div className="movies-grid">
                        {movies.map((movie: any) => (
                            <div key={movie.id} className="movie-card">
                                {movie.poster_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt={movie.title}
                                        className="movie-poster"
                                    />
                                )}
                                <h3>{movie.title}</h3>
                                {movie.release_date && (
                                    <p className="release-date">
                                        Release: {new Date(movie.release_date).getFullYear()}
                                    </p>
                                )}
                                {movie.vote_average && (
                                    <p className="rating">⭐ {movie.vote_average.toFixed(1)}/10</p>
                                )}
                                {movie.overview && (
                                    <p className="overview">{movie.overview.substring(0, 100)}...</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
