import type { RouteObject } from "react-router-dom";
import Search from "./components/search";
import SearchResults from "./pages/SearchResults";
import Navbar from "./components/navbar";
import HomePage from './pages/home'
const routes: RouteObject[] = [
  {
    path: "/",
    element: <><Navbar /><HomePage/></>,
  },
  {
    path: "/search-results",
    element: <><Navbar /><SearchResults /></>, 
  },
];

export default routes;