import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <section className="flex w-screen justify-between py-8 px-72 text-gray-800">
      <Link to="/">
        <h1 className="text-3xl font-bold">Fit Track</h1>
      </Link>
      <ul className="flex gap-12">
        {isAuthenticated ? (
          <>
            <li className="font-light text-sm">
              WELCOME {user.username.toUpperCase()}
            </li>
            <li className="font-light text-sm">
              <Link to="/tasks">ROUTINES</Link>
            </li>
            <li className="font-light text-sm" onClick={logout}>
              LOGOUT
            </li>
          </>
        ) : (
          <>
            <li className="font-light text-sm">
              <Link to="/login">LOGIN</Link>
            </li>
            <li className="font-light text-sm">
              <Link to="/register">REGISTER</Link>
            </li>
          </>
        )}
      </ul>
    </section>
  );
}

export default Navbar;
