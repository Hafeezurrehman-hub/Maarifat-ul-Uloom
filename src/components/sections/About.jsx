import { motion } from "framer-motion";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { StaggerGroup, StaggerItem } from "../ui/Stagger";
import Icon from "../ui/Icon";
import Tilt3D from "../ui/Tilt3D";

const EASE = [0.16, 1, 0.3, 1];

const CARDS = [
  {
    icon: "Compass",
    title: "Mission",
    text: "To provide authentic, structured Quranic and Islamic education to students of all ages, delivered online with the same care and accountability as an in-person madrasah.",
  },
  {
    icon: "Sunrise",
    title: "Vision",
    text: "To become the world's most trusted online academy for Quranic learning, and — in time — a bridge between timeless Islamic knowledge and modern skills.",
  },
  {
    icon: "Star",
    title: "Core Values",
    text: "Authenticity in teaching, sincerity in intention, respect for every learner's pace, and accountability to parents and students alike.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center dark:hidden"
        style={{
          backgroundImage:
            `linear-gradient(rgba(255,255,255,0.35), rgba(255,255,255,0.6)), url('${import.meta.env.BASE_URL}images/about-bg.jpg')`,
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center hidden dark:block"
        style={{
          backgroundImage:
            `linear-gradient(rgba(20,28,48,0.96), rgba(20,28,48,0.98)), url('${import.meta.env.BASE_URL}images/about-bg.jpg')`,
        }}
      />
      <Container className="relative">
        <Reveal className="max-w-2xl mx-auto text-center">
          <Eyebrow>Who We Are</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-900 dark:text-white text-balance">
            Rooted in Tradition. Focused on Tomorrow.
          </h2>
          <p className="mt-6 text-navy-700/80 dark:text-white/70 leading-relaxed">
            Maarifat-ul-Uloom Academy was founded on a simple belief: that every Muslim,
            regardless of age or location, deserves access to authentic, well-taught Quranic
            education — delivered with warmth, structure, and sincerity.
          </p>
        </Reveal>

        <StaggerGroup className="mt-16 grid sm:grid-cols-3 gap-6 lg:gap-8" stagger={0.15}>
          {/* FIX: alternating left/right/up slide-in per card instead of a
              single fade-up — gives the grid more motion and polish */}
          {CARDS.map((card, i) => (
            <StaggerItem key={card.title} direction={i === 0 ? "left" : i === CARDS.length - 1 ? "right" : "up"}>
              <Tilt3D max={9} scale={1.025}>
                <div className="glass rounded-2xl p-8 h-full shadow-3d hover:shadow-3d-hover transition-shadow duration-300 ease-premium">
                  <motion.div
                    style={{ transform: "translateZ(36px)" }}
                    whileHover={{ scale: 1.12, rotate: 4 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="w-14 h-14 rounded-full bg-gold-200/70 shadow-gold flex items-center justify-center mb-6"
                  >
                    <Icon name={card.icon} className="text-gold-700" size={26} />
                  </motion.div>
                  <h3
                    style={{ transform: "translateZ(20px)" }}
                    className="font-heading text-xl font-semibold text-navy-900 dark:text-white mb-3"
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{ transform: "translateZ(10px)" }}
                    className="text-navy-700/75 dark:text-white/70 leading-relaxed text-sm sm:text-base"
                  >
                    {card.text}
                  </p>
                </div>
              </Tilt3D>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
