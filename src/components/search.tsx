import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    function handleSearch() {
        if (query.trim()) {
            // Navigate to search results page with query as URL parameter
            navigate(`/search-results?query=${encodeURIComponent(query)}`);
        }
    }

    return (
        <div className="search-box">
            <input
                type="text"
                className="search-input"
                placeholder="Search for movies or series..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
                className="search-button"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
}
