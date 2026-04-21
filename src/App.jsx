import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

function App() { // This is the main component that renders the entire application
  return (
    <>
      <Navbar />
      <Hero />
      <Menu />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
} // (Andy) the beauty of React is that we can break down our UI into reusable components, making it easier to manage and maintain our code. 
// Each component can be developed and tested independently, 
// which promotes better code organization and reusability.

export default App;