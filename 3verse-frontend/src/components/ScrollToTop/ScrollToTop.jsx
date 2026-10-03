import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Let SectionNavigation handle homepage section hashes.
    if (location.pathname === "/" && location.hash) {
      return;
    }

    // Normal page navigation should always start at the top.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname, location.hash]);

  return null;
}
