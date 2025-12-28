import type { RouteObject } from "react-router-dom";
import Search from "./components/search";
import SearchResults from "./pages/SearchResults";
import Navbar from "./components/navbar";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <><Navbar /></>,
  },
  {
    path: "/search-results",
    element: <><Navbar /><SearchResults /></>, 
  },
];

export default routes;