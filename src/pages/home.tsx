import Navbar from '../components/navbar'
import { TMDB } from "@lorenzopant/tmdb";
import { useState, useEffect } from "react";
import "./home.css"; // Add CSS for styling

const tmdb = new TMDB(import.meta.env.VITE_TMDB_ACCESS_TOKEN);

function Slide_trending() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0); // Track the scroll position

  const MOVIE_CARD_WIDTH = 160; // Width of each movie card (including margin)
  const VISIBLE_MOVIES = 7; // Number of visible movies

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await tmdb.movie_lists.popular(); // Fetch popular movies
        setMovies(data.results || []);
      } catch (err) {
        setError("Failed to fetch trending movies.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleScrollLeft = () => {
    setScrollOffset((prev) => Math.min(prev + MOVIE_CARD_WIDTH * VISIBLE_MOVIES, 0));
  };

  const handleScrollRight = () => {
    setScrollOffset((prev) =>
      Math.max(prev - MOVIE_CARD_WIDTH * VISIBLE_MOVIES, -(movies.length - VISIBLE_MOVIES) * MOVIE_CARD_WIDTH)
    );
  };

  return (
    <div className="trending-section">
      <h1>Trending Movies</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && movies.length > 0 && (
        <div className="movies-container">
          <button className="scroll-button left" onClick={handleScrollLeft}>
            &#8249;
          </button>
          <div className="movies-row-wrapper">
            <div
              className="movies-row"
              style={{
                transform: `translateX(${scrollOffset}px)`,
                transition: "transform 0.3s ease-in-out",
              }}
            >
              {movies.map((movie) => (
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
          </div>
          <button className="scroll-button right" onClick={handleScrollRight}>
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
    return (
        <div>
            <Navbar></Navbar>
            <>
            <Slide_trending/>
            </>
            </div>
    )
}
{/* TODO:
    Add content from the search on a separate page,
    add images for each result with title shown below it and on clicking more descriptive
    Add Home content based of apis in three segments:: Trending, Popular, Recent 
    using the same template for each movie page there */}