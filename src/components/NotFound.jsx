import { Link } from "react-router-dom";

function NotFound() {
  return <main><h2>Page not found</h2><Link to="/menu">Return to menu</Link></main>;
}

export default NotFound;