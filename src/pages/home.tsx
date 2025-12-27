import Navbar from "../navbar";

function Searc(){
    return(
        <div className="search-box"> 
            <input type="text" className="search-input" placeholder="Search for movies or series..." />
            <button className="search-button">Search</button>
        </div>)

}
export default function HomePage() {
    return (
        <div>
            <Searc/>
            </div>
    )
}