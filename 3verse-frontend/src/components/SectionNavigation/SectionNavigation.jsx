import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NAVBAR_HEIGHT = 90;

export default function SectionNavigation() {
  const location = useLocation();

  useEffect(() => {
    // Only handle section navigation on the homepage.
    if (location.pathname !== "/") return;

    const hash = window.location.hash;

    if (!hash) return;

    const sectionId = hash.substring(1);

    let cancelled = false;

    const scrollToSection = () => {
      if (cancelled) return;

      const element = document.getElementById(sectionId);

      if (!element) {
        requestAnimationFrame(scrollToSection);
        return;
      }

      const top =
        element.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;

      window.scrollTo({
        top: Math.max(0, top),
        left: 0,
        behavior: "auto",
      });
    };

    /*
      Give React time to render the complete homepage.
    */
    const frame1 = requestAnimationFrame(() => {
      const frame2 = requestAnimationFrame(() => {
        if (!cancelled) {
          scrollToSection();
        }
      });

      return () => cancelAnimationFrame(frame2);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame1);
    };
  }, [location.pathname, location.hash]);

  return null;
}
