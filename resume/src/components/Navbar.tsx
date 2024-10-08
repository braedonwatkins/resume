import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between p-4">
      <ul className="flex gap-10 pl-10">
        <Link to="/">Home</Link>
        {/* IDK if this is clearer as /home but I'm not gonna worry about it */}
        <Link to="/blog">Bloog</Link>
      </ul>
      <ul className="flex gap-10 pr-10">
        <Link to="/about-me">About Me</Link>
      </ul>
    </nav>
  );
};

export { Navbar };
