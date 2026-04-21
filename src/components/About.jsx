import React from "react"; 

function About() { // This component provides information about the restaurant's story and mission
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-text">
          <h1>Our Story</h1>
          <p>
            Kwizin Ayisyen Lafleur is an honor to Haitian culture and cuisine.
            3 generations of the Lafleur family have been sharing their love for
            Haitian food, and we are proud to continue that tradition in our
            restaurant. Our menu features a variety of classic dishes that
            showcase the rich flavors and vibrant spices of Haiti.
          </p>

          <p>
            From crispy griot to savory diri ak djon djon, every dish is
            prepared with care, fresh ingredients, and traditional Caribbean
            spices. Our mission is to share the warmth, culture, and vibrant
            spirit of Ayiti through food. Banan Peze is a must-try, and our
            signature pikliz is inspired by the spiciness of Haitian cuisine.
            We invite you to experience the authentic flavors of Haiti in every
            dish we serve.
          </p>
        </div>

        <div className="about-image">
          <img src="/images/contact.JPG.webp" alt="Restaurant Interior" />
        </div>
      </div>
    </section>
  );
}
// 1. The about section is designed to provide visitors with a deeper understanding of the restaurant's background and values.
// 2. The text is organized into two paragraphs, with the first paragraph focusing on the restaurant's history and the second paragraph highlighting the mission and unique offerings of the restaurant.
// 3. The image on the right side of the about section adds visual interest and helps to create a more engaging user experience./
// 4. The use of descriptive language in the text helps to evoke the flavors and culture of Haiti, making it more appealing to potential customers who are interested in trying authentic Haitian cuisine.

export default About;