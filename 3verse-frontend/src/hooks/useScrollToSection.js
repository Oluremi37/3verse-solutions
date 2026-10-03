import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function useScrollToSection() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = useCallback(
    (sectionId) => {
      if (location.pathname === "/") {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/", { state: { scrollTo: sectionId } });
      }
    },
    [location.pathname, navigate],
  );

  return scrollToSection;
}
