
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../../services/serviceService";
import "./ServicesMegaMenu.css";

export default function ServicesMegaMenu({ onLinkClick }) {
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadServices = async () => {
      try {
        const data = await getServices();
        const list = Array.isArray(data?.services)
          ? data.services
          : [];

        if (cancelled) return;

        setServices(list);
        setActiveService(list[0] || null);
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load mega menu services:", err);
        }
      }
    };

    loadServices();

    return () => {
      cancelled = true;
    };
  }, []);

  if (services.length === 0) return null;

  // Keep the first six services in the first two columns.
  // Put every remaining service in the third column.
  const columns = [
    services.slice(0, 3),
    services.slice(3, 6),
    services.slice(6),
  ];

  const renderService = (service, index) => (
    <Link
      key={service._id || service.slug}
      to={`/services/${service.slug}`}
      className={`mega-item ${
        activeService?.slug === service.slug ? "active" : ""
      }`}
      onMouseEnter={() => setActiveService(service)}
      onFocus={() => setActiveService(service)}
      onClick={onLinkClick}
    >
      <div className="mega-number">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="mega-text">
        <h4>{service.title}</h4>
        <p>{service.menuDescription || service.heroDescription || ""}</p>
      </div>
    </Link>
  );

  return (
    <div className="services-mega-menu">
      <div className="mega-menu-content">
        {/* First column: services 01–03 */}
        <div className="mega-column">
          {columns[0].map((service, index) =>
            renderService(service, index)
          )}
        </div>

        {/* Second column: services 04–06 */}
        <div className="mega-column">
          {columns[1].map((service, index) =>
            renderService(service, index + 3)
          )}
        </div>

        {/* Third column: services 07–09 and featured preview */}
        <div className="mega-preview-column">
          <div className="mega-extra-services">
            {columns[2].map((service, index) =>
              renderService(service, index + 6)
            )}
          </div>

          {activeService && (
            <Link
              to={`/services/${activeService.slug}`}
              className="mega-preview"
              onClick={onLinkClick}
            >
              {activeService.heroImage && (
                <img
                  src={activeService.heroImage}
                  alt={activeService.title}
                  className="mega-preview-image"
                />
              )}

              <div className="mega-preview-content">
                <h4>{activeService.title}</h4>
                <p>
                  {activeService.heroDescription ||
                    activeService.menuDescription ||
                    ""}
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
