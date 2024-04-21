import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <header className="flex justify-between p-4">
        <ul className="flex gap-8 pl-10">
          <Link to="/home">Home</Link>
          <Link to="/blog">Bloog</Link>
        </ul>
        <ul className="flex gap-8 pl-10">
          <Link to="/about-me">About Me</Link>
        </ul>
      </header>
      <body>
        <div>
          <div>SHOWCASE</div>
          <div>PROJECT ulST</div>
        </div>
        <div>PROFILE</div>
      </body>
    </div>
  );
};

export { Home };
