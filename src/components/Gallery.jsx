import React, { useState } from "react"; // 1. The Gallery component is designed to showcase a collection of images that represent the restaurant's interior and dishes, providing visitors with a visual representation of what they can expect when they visit the restaurant.
import { getImagePath } from "../utils/getImagePath";
// 2. The component uses the useState hook to manage the current slide index, allowing users to navigate through the images using previous and next buttons.
// 3. The images are stored in an array, and the current image is displayed based on the currentSlide state.
// 4. The goToPrevious and goToNext functions update the currentSlide state to navigate through the images, wrapping around to the beginning or end of the array as needed.
// 5. The gallery section includes a heading and a brief description to provide context for the images being displayed.

function Gallery() {
  const images = [ // 1. The images array contains the paths to the images that will be displayed in the gallery. Each image is imported using the getImagePath function 
  // to ensure that the correct path is used based on the deployment environment.
    getImagePath("images/gallery1.jpg.webp"),
    getImagePath("images/gallery2.jpg.webp"),
    getImagePath("images/gallery3.jpg.webp"),
    getImagePath("images/gallery4.jpg.webp"),
    getImagePath("images/gallery5.jpg.webp"),
    getImagePath("images/gallery6.jpg"),
  ];

  const [currentSlide, setCurrentSlide] = useState(0); // 2. The currentSlide state is initialized to 0, which means that the first image in the array will be displayed when the gallery component is rendered.

  function goToPrevious() { // This function updates the currentSlide state to show the previous image in the array. If the current slide is the first one (index 0), it wraps around to the last image in the array.
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function goToNext() { // This function updates the currentSlide state to show the next image in the array. If the current slide is the last one (index images.length - 1), it wraps around to the first image in the array.
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  return (
    <section className="gallery" id="gallery">
      <h1>Our Gallery</h1>
      <p>
        Please take a look at our traditional interior and explore our
        collection of Haitian dishes.
      </p>

      <div className="slider">
        <button className="prev" onClick={goToPrevious} type="button">
          &#10094;
        </button>

        <div className="slides">
          <img
            src={images[currentSlide]}
            alt={`Gallery slide ${currentSlide + 1}`}
            className="slide active"
          />
        </div>

        <button className="next" onClick={goToNext} type="button">
          &#10095;
        </button>
      </div>
    </section>
  );
}

export default Gallery; // we export this gallery component in app.jsx
