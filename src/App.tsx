import React from "react";
import { Navbar } from "./components/Navbar";
import { Title } from "./components/Title";
import { Cards } from "./components/Cards";
import { MyPics } from "./components/MyPics";
import { Footer } from "./components/Footer";

import "./index.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <section>
          <Title />
          <Cards />
        </section>
        <MyPics />
      </main>
      <Footer />
    </div>
  );
}

export default App;

