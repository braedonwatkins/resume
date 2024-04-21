import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { debugOutline } from "../utils/debugOutline";
import { Showcase } from "../components/Showcase";
import { ProjectList } from "../components/ProjectList";
import { Profile } from "../components/Profile";

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
          <Showcase />
          <ProjectList />
        </div>
        <div className="right-main flex flex-[2_1_0%] flex-col items-center justify-center">
          <Profile />
        </div>
      </main>
    </body>
  );
};

export { Home };
