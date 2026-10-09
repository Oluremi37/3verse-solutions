import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/3verse-logo-1.png";

import { getServices } from "../../services/serviceService";
import ServicesMegaMenu from "../ServicesMegaMenu/ServicesMegaMenu";
import AboutMegaMenu from "../AboutMegaMenu/AboutMegaMenu";
import { FaChevronDown } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [services, setServices] = useState([]);
  const servicesTimeoutRef = useRef(null);
  const aboutTimeoutRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const openServicesMenu = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }

    setIsServicesOpen(true);
  };

  const closeServicesMenu = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 180);
  };

  const openAboutMenu = () => {
    if (aboutTimeoutRef.current) {
      clearTimeout(aboutTimeoutRef.current);
    }

    setIsAboutOpen(true);
  };

  const closeAboutMenu = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setIsAboutOpen(false);
    }, 180);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
    setIsMobileAboutOpen(false);
    setIsServicesOpen(false);
    setIsAboutOpen(false);

    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }

    if (aboutTimeoutRef.current) {
      clearTimeout(aboutTimeoutRef.current);
    }
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();

    closeMenu();

    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate("/", {
        state: {
          scrollTo: sectionId,
        },
      });
    }
  };

  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;

      let cancelled = false;
      let settleTimer = null;

      const doScroll = () => {
        if (cancelled) return;

        const el = document.getElementById(sectionId);

        if (!el) return;

        const html = document.documentElement;
        const previousBehavior = html.style.scrollBehavior;

        html.style.scrollBehavior = "auto";

        el.scrollIntoView({
          behavior: "auto",
        });

        requestAnimationFrame(() => {
          html.style.scrollBehavior = previousBehavior;
        });

        navigate(location.pathname, {
          replace: true,
          state: {},
        });
      };

      const observer = new MutationObserver(() => {
        if (cancelled) return;

        if (settleTimer) {
          clearTimeout(settleTimer);
        }

        settleTimer = setTimeout(() => {
          if (!cancelled) {
            observer.disconnect();
            doScroll();
          }
        }, 300);
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      settleTimer = setTimeout(() => {
        if (!cancelled) {
          observer.disconnect();
          doScroll();
        }
      }, 300);

      const safetyTimeout = setTimeout(() => {
        cancelled = true;
        observer.disconnect();

        if (settleTimer) {
          clearTimeout(settleTimer);
        }
      }, 5000);

      return () => {
        cancelled = true;
        observer.disconnect();

        if (settleTimer) {
          clearTimeout(settleTimer);
        }

        clearTimeout(safetyTimeout);
      };
    }
  }, [location, navigate]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices();
        setServices(data.services || []);
      } catch (err) {
        console.error("Failed to load services", err);
      }
    };

    loadServices();
  }, []);

  return (
    <header className="header">
      <div className="nav-container">
        <a
          href="#home"
          className="logo"
          onClick={(e) => handleNavClick(e, "home")}
        >
          <img src={logo} alt="3Verse Solution Limited" />
        </a>

        <nav className="nav-menu">
          <ul className="nav-links">
            <li className="nav-item">
              <a href="#home" onClick={(e) => handleNavClick(e, "home")}>
                Home
              </a>
            </li>

            <li className="nav-item nav-item-dropdown">
              <div
                className="services-dropdown-wrapper"
                onMouseEnter={openAboutMenu}
                onMouseLeave={closeAboutMenu}
              >
                <Link
                  to="/about"
                  className="dropdown-trigger"
                  onClick={closeMenu}
                >
                  About Us
                  <FaChevronDown className="dropdown-icon" />
                </Link>

                {isAboutOpen && <AboutMegaMenu onLinkClick={closeMenu} />}
              </div>
            </li>

            <li className="nav-item nav-item-dropdown">
              <div
                className="services-dropdown-wrapper"
                onMouseEnter={openServicesMenu}
                onMouseLeave={closeServicesMenu}
              >
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, "services")}
                >
                  Services
                </a>

                <FaChevronDown className="dropdown-icon" />

                {isServicesOpen && <ServicesMegaMenu onLinkClick={closeMenu} />}
              </div>
            </li>

            <li className="nav-item">
              <Link to="/products">Products</Link>
            </li>

            <li className="nav-item">
              <Link to="/portfolio">Projects</Link>
            </li>

            <li className="nav-item">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Link to="/request-quote" className="quote-btn">
          Request a Quote
        </Link>

        <button
          className="hamburger-btn"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu />
        </button>
      </div>

      <div
        className={`mobile-overlay ${isMenuOpen ? "open" : ""}`}
        onClick={closeMenu}
      />

      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <a
            href="#home"
            className="logo"
            onClick={(e) => handleNavClick(e, "home")}
          >
            <img src={logo} alt="3Verse Solution Limited" />
          </a>

          <button
            className="close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>

        <ul className="mobile-nav-links">
          <li className="mobile-nav-item">
            <a href="#home" onClick={(e) => handleNavClick(e, "home")}>
              Home
            </a>
          </li>

          <li className="mobile-nav-item mobile-nav-item-dropdown">
            <div className="mobile-services-toggle-wrapper">
              <Link
                to="/about"
                className="mobile-services-toggle"
                onClick={closeMenu}
                style={{ flex: 1 }}
              >
                About Us
              </Link>

              <button
                className="mobile-services-toggle"
                onClick={() => setIsMobileAboutOpen((prev) => !prev)}
                style={{ width: "auto", paddingLeft: "8px" }}
              >
                <FaChevronDown
                  className={`dropdown-icon ${isMobileAboutOpen ? "rotated" : ""}`}
                />
              </button>
            </div>

            {isMobileAboutOpen && (
              <div className="mobile-services-list">
                <Link to="/about/story" onClick={closeMenu}>
                  Our Story
                </Link>
                <Link to="/about/mission" onClick={closeMenu}>
                  Our Mission
                </Link>
                <Link to="/team" onClick={closeMenu}>
                  Management Team
                </Link>
              </div>
            )}
          </li>

          <li className="mobile-nav-item mobile-nav-item-dropdown">
            <button
              className="mobile-services-toggle"
              onClick={() => setIsMobileServicesOpen((prev) => !prev)}
            >
              Services
              <FaChevronDown
                className={`dropdown-icon ${
                  isMobileServicesOpen ? "rotated" : ""
                }`}
              />
            </button>

            {isMobileServicesOpen && (
              <div className="mobile-services-list">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    onClick={closeMenu}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li className="mobile-nav-item">
            <Link to="/products" onClick={closeMenu}>
              Products
            </Link>
          </li>

          <li className="mobile-nav-item">
            <Link to="/portfolio" onClick={closeMenu}>
              Portfolio
            </Link>
          </li>

          <li className="mobile-nav-item">
            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </li>
        </ul>

        <Link
          to="/request-quote"
          className="quote-btn mobile-quote-btn"
          onClick={closeMenu}
        >
          Request a Quote
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
