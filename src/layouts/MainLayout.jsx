import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import ScrollProgressBar from "../components/ui/ScrollProgressBar";

// Scroll to top on every page change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <ScrollProgressBar />
      <Navbar />
      <main className="pt-20">
  <Outlet />
</main>
      <Footer />
    </>
  );
}
