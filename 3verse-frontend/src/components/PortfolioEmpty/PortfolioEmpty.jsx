import { FiFolder } from "react-icons/fi";
import "./PortfolioEmpty.css";

export default function PortfolioEmpty() {
  return (
    <div className="portfolio-empty">
      <FiFolder className="portfolio-empty-icon" />

      <h2>No Projects Yet</h2>

      <p>
        Our projects are currently being updated. Please check back soon to see
        our latest work.
      </p>
    </div>
  );
}
