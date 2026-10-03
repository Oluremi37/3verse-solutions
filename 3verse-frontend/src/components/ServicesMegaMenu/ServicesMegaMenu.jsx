import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../../services/serviceService";
import "./ServicesMegaMenu.css";

export default function ServicesMegaMenu({ onLinkClick }) {
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices();

        const list = data.services || [];

        setServices(list);

        if (list.length > 0) {
          setActiveService(list[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadServices();
  }, []);

  if (!activeService) return null;

  return (
    <div className="services-mega-menu">
      <div className="mega-menu-content">
        {/* LEFT COLUMN */}
        <div className="mega-column">
          {services.slice(0, 3).map((service, index) => (
            <Link
              key={service._id}
              to={`/services/${service.slug}`}
              className={`mega-item ${
                activeService.slug === service.slug ? "active" : ""
              }`}
              onMouseEnter={() => setActiveService(service)}
              onClick={onLinkClick}
            >
              <div className="mega-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="mega-text">
                <h4>{service.title}</h4>
                <p>{service.menuDescription}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* MIDDLE COLUMN */}
        <div className="mega-column">
          {services.slice(3, 6).map((service, index) => (
            <Link
              key={service._id}
              to={`/services/${service.slug}`}
              className={`mega-item ${
                activeService.slug === service.slug ? "active" : ""
              }`}
              onMouseEnter={() => setActiveService(service)}
              onClick={onLinkClick}
            >
              <div className="mega-number">
                {String(index + 4).padStart(2, "0")}
              </div>

              <div className="mega-text">
                <h4>{service.title}</h4>
                <p>{service.menuDescription}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* RIGHT COLUMN */}
        <div className="mega-preview-column">
          {services[6] && (
            <Link
              to={`/services/${services[6].slug}`}
              className={`mega-item ${
                activeService.slug === services[6].slug ? "active" : ""
              }`}
              onMouseEnter={() => setActiveService(services[6])}
              onClick={onLinkClick}
            >
              <div className="mega-number">07</div>

              <div className="mega-text">
                <h4>{services[6].title}</h4>
                <p>{services[6].menuDescription}</p>
              </div>
            </Link>
          )}

          <div className="mega-preview">
            <img
              src={activeService.heroImage}
              alt={activeService.title}
              className="mega-preview-image"
            />

            <div className="mega-preview-content">
              <h4>{activeService.title}</h4>

              <p>{activeService.heroDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
