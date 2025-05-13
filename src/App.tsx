import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

function App() {
  // Add mobile-specific adjustments
  useEffect(() => {
    // Prevent overscroll/bounce effect on mobile
    document.body.style.overscrollBehavior = "none";

    // Handle hardware back button for Android
    document.addEventListener("backbutton", (e) => {
      e.preventDefault();
      // Handle navigation history here if needed
    });

    return () => {
      document.removeEventListener("backbutton", () => {});
    };
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
