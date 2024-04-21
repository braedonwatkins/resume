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
    <body className="flex flex-col h-screen w-screen">
      <Navbar />
      <main className="flex justify-between h-full">
        <div className="left-main flex flex-col justify-center flex-1">
          <div className="flex flex-1 items-center justify-center">
            SHOWCASE
          </div>
          <div className="flex flex-1 items-center justify-center">
            PROJECT LIST
          </div>
        </div>
        <div className="right-main flex flex-col items-center justify-center flex-1">
          <div>PROFILE</div>
        </div>
      </main>
    </body>
  );
};

export { Home };
