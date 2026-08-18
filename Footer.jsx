import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import GeometricStar from "../ui/GeometricStar";
import { SITE, FOOTER_LINKS } from "../../constants/site";
import { COURSES } from "../../data/courses";

const EASE = [0.16, 1, 0.3, 1];

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.2);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 w-11 h-11 rounded-full bg-gold-500 hover:bg-gold-400 text-navy-900 flex items-center justify-center shadow-gold transition-colors duration-300 ease-premium"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-navy-900 pt-20 lg:pt-28 pb-8 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.04] pointer-events-none">
        <GeometricStar opacity={1} stroke="#C9973B" />
      </div>
      <Container className="relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-14">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src={`${import.meta.env.BASE_URL}images/logo-dark.png`}
                alt="Maarifat-ul-Uloom Academy logo"
                loading="lazy"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="font-heading text-lg font-semibold text-white">{SITE.shortName}</p>
            </div>
            <p className="mt-3 text-sm text-white/55 leading-relaxed max-w-xs">
              {SITE.tagline}. One student at a time.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gold-500 mb-4">Quick Links</p>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.quick.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-white/60 hover:text-gold-400 transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gold-500 mb-4">Courses</p>
            <ul className="space-y-2.5">
              {COURSES.slice(0, 6).map((c) => (
                <li key={c.title}>
                  <Link to="/courses" className="text-sm text-white/60 hover:text-gold-400 transition-colors duration-200">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gold-500 mb-4">Contact</p>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Phone size={14} className="text-gold-500 shrink-0" />
                <a href={`tel:${SITE.phoneMale.replace(/\s/g, "")}`} className="hover:text-gold-400 transition-colors">
                  {SITE.phoneMale}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Phone size={14} className="text-gold-500 shrink-0" />
                <a href={`tel:${SITE.phoneFemale.replace(/\s/g, "")}`} className="hover:text-gold-400 transition-colors">
                  {SITE.phoneFemale}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Mail size={14} className="text-gold-500 shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-gold-400 transition-colors break-all">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© 2026 {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {FOOTER_LINKS.legal.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-gold-400 transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
      <BackToTop />
    </footer>
  );
}
