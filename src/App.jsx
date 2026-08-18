import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PageLoader from "./components/ui/PageLoader";

// FIX: this is the actual fix for "pages loading smoothly" — each page is
// now its own JS chunk, fetched only when the visitor navigates to it,
// instead of one big bundle containing every page upfront. Home loads
// eagerly (it's the first thing anyone sees); every other page is lazy.
import Home from "./pages/Home";
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const TeachersPage = lazy(() => import("./pages/TeachersPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={
            <Suspense fallback={<PageLoader />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="/courses"
          element={
            <Suspense fallback={<PageLoader />}>
              <CoursesPage />
            </Suspense>
          }
        />
        <Route
          path="/teachers"
          element={
            <Suspense fallback={<PageLoader />}>
              <TeachersPage />
            </Suspense>
          }
        />
        <Route
          path="/pricing"
          element={
            <Suspense fallback={<PageLoader />}>
              <PricingPage />
            </Suspense>
          }
        />
        <Route
          path="/faq"
          element={
            <Suspense fallback={<PageLoader />}>
              <FaqPage />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<PageLoader />}>
              <ContactPage />
            </Suspense>
          }
        />
        {/* Unknown routes fall back to Home rather than a blank/broken page */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
