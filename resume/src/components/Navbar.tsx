import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex justify-between p-4">
      <ul className="flex gap-8 pl-10">
        <Link to="/home">Home</Link>
        <Link to="/blog">Bloog</Link>
      </ul>
      <ul className="flex gap-8 pl-10">
        <Link to="/about-me">About Me</Link>
      </ul>
    </header>
  );
};

export { Navbar };
