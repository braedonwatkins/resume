import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { AboutMe } from "./pages/AboutMe";
import { Blog } from "./pages/Blog";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <body className="flex flex-col h-screen w-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </body>
      </Router>
    </>
  );
}

export default App;
