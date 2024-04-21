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
        <div className="left-main flex flex-[3_1_0%] flex-col justify-center">
          <div className="flex flex-[2_1_0%] items-center justify-center">
            SHOWCASE
          </div>
          <div className="flex flex-[3_1_0%] items-center justify-center">
            PROJECT LIST
          </div>
        </div>
        <div className="right-main flex flex-[2_1_0%] flex-col items-center justify-center">
          <div>PROFILE</div>
        </div>
      </main>
    </body>
  );
};

export { Home };
