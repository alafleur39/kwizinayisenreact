import React from "react";

function Contact() { // the Contact component provides a contact form for users to send messages and a reservation form for booking tables, along with an embedded Google Map showing the restaurant's location.
  function handleSubmit(event) { // this function is a placeholder for handling form submissions. It currently prevents the default form submission behavior, which would typically involve sending the form data to a server or displaying a success message.
    event.preventDefault();
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h1>Contact Us</h1>

        <div className="contact-grid">
          <form className="contact-form form-card" onSubmit={handleSubmit}>
            <h2>Send Us a Message</h2>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">
                Your Name
              </label>
              <input id="contact-name" type="text" required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">
                Your Email
              </label>
              <input id="contact-email" type="email" required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">
                Your Message
              </label>
              <textarea id="contact-message" rows="4" required></textarea>
            </div>

            <button type="submit">Send Message</button>
          </form>

          <div className="map-container form-card">
            <iframe
              title="Kwizin Ayisyen Lafleur location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.1234567890123!2d-73.56789012345678!3d40.67890123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c1234567890123%3A0xabcdef1234567890!2sKwizin%20Ayisyen%20Lafleur!5e0!3m2!1sen!2sus!4v1234567890123"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="reservation-section">
          <form className="reservation-form form-card" onSubmit={handleSubmit}>
            <h2>Make a Reservation</h2>

            <div className="reservation-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="res-name">
                  Full Name
                </label>
                <input id="res-name" type="text" required />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="res-phone">
                  Phone Number
                </label>
                <input id="res-phone" type="tel" required />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="res-email">
                  Email Address
                </label>
                <input id="res-email" type="email" required />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="res-date">
                  Date
                </label>
                <input id="res-date" type="date" required />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="res-time">
                  Time
                </label>
                <input id="res-time" type="time" required />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="res-guests">
                  Party Size
                </label>
                <input id="res-guests" type="number" min="1" max="20" required />
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="res-notes">
                  Special Requests
                </label>
                <textarea id="res-notes" rows="3"></textarea>
              </div>
            </div>

            <button type="submit">Reserve a Table</button>
          </form>
        </div>
      </div>
    </section>
  );
}
// 1. The Contact component is structured to provide users with two main functionalities: sending a message to the restaurant and making a reservation.
// 2. The contact form includes fields for the user's name, email, and message, allowing customers to easily reach out with inquiries or feedback.
// 3. An embedded Google Map is included to visually display the restaurant's location, making it easier for customers to find them.
// 4. The reservation form collects essential information such as the customer's name, contact details, reservation date and time, party size, and any special requests, streamlining the booking process for both customers and staff.
export default Contact;
