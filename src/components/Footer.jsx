import React from "react"; // 1. The Footer component is designed to provide visitors with essential information about the restaurant, 
// including business hours and social media links.

function Footer() { // 2. The footer is structured into three main sections: the restaurant's name and tagline, business hours, and social media links. This organization allows visitors to quickly find the information they need.
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Kwizin Ayisyen Lafleur</h3>
          <p>From the home and heart of the Lafleur Family</p>
        </div>

        <div className="footer-section">
          <h4>Business Hours</h4>
          <p>Mon - Fri: 11am - 9pm</p>
          <p>Saturday: 12pm - 10pm</p>
          <p>Sunday: Closed</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <a className="social-link" href="#">
            Facebook
          </a>
          <br />
          <a className="social-link" href="#">
            Instagram
          </a>
          <br />
          <a className="social-link" href="#">
            Twitter
          </a>
        </div>
      </div>

      <p className="footer-bottom">2026 Kwizin Ayisyen Lafleur.</p>
    </footer>
  );
}
// 3. The business hours are clearly listed, making it easy for customers to know when they can visit the restaurant.
// 4. The social media links encourage visitors to connect with the restaurant online, which can help to build a community and increase customer engagement.
// 5. The footer also includes a copyright notice at the bottom, which adds a professional touch and indicates that the content is protected.
export default Footer;