import "./PortfolioSkeleton.css";

export default function PortfolioSkeleton() {
  return (
    <div className="portfolio-skeleton-card">
      <div className="portfolio-skeleton-image"></div>

      <div className="portfolio-skeleton-content">
        <div className="portfolio-skeleton-line short"></div>

        <div className="portfolio-skeleton-line"></div>

        <div className="portfolio-skeleton-line"></div>

        <div className="portfolio-skeleton-line medium"></div>
      </div>
    </div>
  );
}
