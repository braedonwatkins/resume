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
    <div className="h-screen w-screen">
      <Navbar />
      <body className="flex flex-1 flex-col h-full">
        <main className="flex flex-1 justify-between h-full">
          <div className="left-main flex flex-col items-stretch justify-center flex-1">
            <div className="flex flex-1 items-center justify-center h-full">
              SHOWCASE
            </div>
            <div className="flex flex-1 items-center justify-center h-full">
              PROJECT LIST
            </div>
          </div>
          <div className="right-main flex flex-col items-center justify-center flex-1">
            <div>PROFILE</div>
          </div>
        </main>
      </body>
    </div>
  );
};

export { Home };
