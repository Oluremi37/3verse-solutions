
import { Link } from "react-router-dom";
import "./ProductsHero.css";
import heroImage from "../../assets/images/HeroPro-cropped-3.png";

export default function ProductsHero() {
  return (
    <section className="products-hero">
      <div className="products-hero-bg">
        <div className="products-hero-container">
          <div className="products-hero-text">
            <span className="products-hero-eyebrow">
              TECHNOLOGY FOR THE MODERN WORKPLACE
            </span>

            <h1>
              Smart Office
              <span> Devices.</span>
            </h1>

            <div className="products-hero-accent" />

            <p>
              Discover business communication and collaboration
              devices designed to connect your people, simplify
              meetings, and keep your business moving.
            </p>

            <div className="products-hero-actions">
              <a href="#products" className="products-btn-primary">
                Explore Products <span>→</span>
              </a>

              <Link
                to="/request-quote"
                className="products-btn-outline"
              >
                Request a Quote <span>↗</span>
              </Link>
            </div>

            <div className="products-hero-note">
              <span className="products-hero-note-dot" />
              Business-ready technology. Tailored to your needs.
            </div>
          </div>

          <div className="products-hero-image">
            <div className="products-hero-image-glow" />

            <img
              src={heroImage}
              alt="Smart office phones and conferencing devices"
            />
          </div>
        </div>

        <div className="products-hero-bottom-line" />
      </div>
    </section>
  );
}

