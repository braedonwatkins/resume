import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { debugOutline } from "../utils/debugOutline";

const DEBUG_MODE = import.meta.env.VITE_DEBUG === "true";

const Home = () => {
  useEffect(() => {
    if (DEBUG_MODE) {
      debugOutline();
    }
  }, []); // Empty dependency array ensures this runs once on mount.
  return (
    <div>
      <Navbar />
      <body className="flex justify-between">
        <div className="flex-col">
          <div>SHOWCASE</div>
          <div>PROJECT LIST</div>
        </div>
        <div className="flex-col">PROFILE</div>
      </body>
    </div>
  );
};

export { Home };
