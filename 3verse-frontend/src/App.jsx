import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import SectionNavigation from "./components/SectionNavigation/SectionNavigation";

function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <SectionNavigation />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
