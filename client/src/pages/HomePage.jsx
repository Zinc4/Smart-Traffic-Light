import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <Link to="app">Map</Link>
      <br />
      <Link to="login">Login</Link>
    </div>
  );
}

export default HomePage;
