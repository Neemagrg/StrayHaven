import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AnimalCards from "../components/AnimalCards";
import Footer from "../components/Footer";

/**
 * Home Page
 * Composed entirely of reusable components.
 * To edit any section, open the matching file in /components/
 *
 *  Navbar    → components/Navbar.jsx
 *  Hero      → components/Hero.jsx
 *  Animals   → components/AnimalCards.jsx   (featured animals + rescue guides)
 *  Emergency → components/Emergency.jsx     (quick rescue form + map)
 *  Footer    → components/Footer.jsx
 */
function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AnimalCards />
      <Footer />
    </>
  );
}

export default Home;