import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SectionScroll() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;

    const hash = window.location.hash;

    if (!hash) return;

    const sectionId = hash.substring(1);

    let cancelled = false;
    let attempts = 0;

    const findAndScroll = () => {
      if (cancelled) return;

      const element = document.getElementById(sectionId);

      if (!element) {
        attempts += 1;

        if (attempts < 50) {
          setTimeout(findAndScroll, 100);
        }

        return;
      }

      // Wait for the current layout to settle.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cancelled) return;

          const navbarHeight = 90;

          const elementTop =
            element.getBoundingClientRect().top + window.scrollY;

          window.scrollTo({
            top: Math.max(0, elementTop - navbarHeight),
            left: 0,
            behavior: "auto",
          });
        });
      });
    };

    // Start after React has rendered the page.
    const timer = setTimeout(findAndScroll, 100);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [location.pathname, location.key]);

  return null;
}
