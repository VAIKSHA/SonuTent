import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Packages from './components/Packages';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Packages />
        <Gallery />
        <Reviews />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;