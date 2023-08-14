import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex absolute top-0 w-screen justify-between py-8 px-14 text-gray-50">
      <Link to="/">
        <h1 className="text-3xl font-bold">Fit Track</h1>
      </Link>
      <ul className="flex gap-12">
        <li className="font-light text-sm">WELCOME SANTIAGO</li>
        <li className="font-light text-sm">LOGIN</li>
        <li className="font-light text-sm">REGISTER</li>
      </ul>
    </nav>
  );
}

export default Navbar;
