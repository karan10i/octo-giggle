import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { TMDB } from "@lorenzopant/tmdb";
import Search from "../components/search";
import "./SearchResults.css"; // Import the CSS file for styling

const tmdb = new TMDB(import.meta.env.VITE_TMDB_ACCESS_TOKEN);

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [totalPages, setTotalPages] = useState(1); // Track the total number of pages
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
                const results = await tmdb.search.movies({ query, page: currentPage }); // Fetch results for the current page
                if (results && results.results) {
                    setMovies(results.results);
                    setTotalPages(results.total_pages); // Set the total number of pages
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
    }, [query, currentPage, navigate]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

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
                    <>
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
                                    <h3 className="movie-title">{movie.title}</h3>
                                </div>
                            ))}
                        </div>
                        <div className="pagination">
                            <button
                                className="pagination-button"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className="pagination-info">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                className="pagination-button"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
