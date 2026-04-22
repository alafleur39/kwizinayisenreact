import React from "react"; // we are importing the react library to create our hero component
import { Link } from "react-router-dom"; // we are importing the Link component from react-router-dom to create a link to the menu page when the user clicks on the "View Our Menu" button in the hero section
import { getImagePath } from "../utils/getImagePath"; // we are importing the getImagePath function from our utils folder to help us get the correct path for our background image and logo image in the hero component

function Hero() { // this is the hero component that will be used to display the main banner of our website 
  return (
    <section
      className="hero"
      id="home"
      style={{
        backgroundImage: `url(${getImagePath("images/Haitian-Food-Photo-Collage-2-scaled.jpg.webp")})`,
      }}
    >
      <div className="hero-content">
        <img
          src={getImagePath("images/logo.png")}
          className="hero-logo"
          alt="Kwizin Ayisyen Lafleur logo"
        />
        <h1>Kwizin Ayisyen Lafleur</h1>
        <p className="hero-subtitle">
          From the home and heart of the Lafleur Family
        </p>
        <p className="hero-subtitle">
          We invite you to experience the authentic flavors of Haiti in every dish we serve.
        </p>
        <Link to="/menu" className="btn">
          View Our Menu
        </Link>
      </div>
    </section>
  );
}
// 1. The hero section is designed to be visually appealing and to immediately convey the essence of the restaurant.
// 2. The logo is prominently displayed at the top of the hero section, reinforcing brand identity.
// 3. The main heading (h1) clearly states the name of the restaurant, making it easy for visitors to identify.
// 4. The subtitle provides a warm and inviting message that emphasizes the authenticity and family heritage of the restaurant.
// 5. The call-to-action button encourages visitors to explore the menu, guiding them towards taking action and engaging with the website.

export default Hero;
