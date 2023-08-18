import { Link } from "react-router-dom";

function Navbar() {
  return (
    <section className="flex w-screen justify-between py-8 px-72 text-gray-50">
      <Link to="/">
        <h1 className="text-3xl font-bold">Fit Track</h1>
      </Link>
      <ul className="flex gap-12">
        <li className="font-light text-sm">WELCOME SANTIAGO</li>
        <li className="font-light text-sm">
          <Link to="/login">LOGIN</Link>
        </li>
        <li className="font-light text-sm">
          <Link to="/register">REGISTER</Link>
        </li>
      </ul>
    </section>
  );
}

export default Navbar;
