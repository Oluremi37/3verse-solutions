import "./Footer.css";
import { Link } from "react-router-dom";
import { FiTwitter, FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-about">
            <p>
              We bridge the gap between complex infrastructure requirements and
              seamless business operations.
            </p>

            <div className="footer-socials">
              <a href="#" aria-label="Twitter">
                <FiTwitter />
              </a>

              <a href="#" aria-label="Facebook">
                <FiFacebook />
              </a>

              <a href="#" aria-label="Instagram">
                <FiInstagram />
              </a>

              <a href="#" aria-label="LinkedIn">
                <FiLinkedin />
              </a>

              <a
                href="https://wa.me/2348135710769"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Explore</h4>

            <div className="footer-links-grid">
              <a href="/#home">Home</a>
              <a href="/products">Products</a>
              <a href="/#about">About Us</a>
              <Link to="/contact">Contact</Link>
              <a href="/#services">Services</a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Contact us</h4>

            <p className="footer-phone">+234 813 571 0769</p>

            {/* <p className="footer-phone">+234 808 125 0063</p> */}
          </div>
        </div>

        <div className="footer-divider" />

        <p className="footer-copyright">
          © 2026 Copyright, All Rights Reserved, 3Verse Solutions Limited
        </p>
      </div>
    </footer>
  );
}
