import { Quote } from "lucide-react";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { StaggerGroup, StaggerItem } from "../ui/Stagger";
import Tilt3D from "../ui/Tilt3D";
import { TESTIMONIALS } from "../../data/misc";

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-cream-light dark:bg-navy-900 overflow-hidden">
      <Container>
        <Reveal className="max-w-2xl mx-auto text-center mb-16">
          <Eyebrow>What Families Say</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-900 dark:text-white text-balance">
            Trusted by Families Around the World
          </h2>
          <p className="mt-5 text-navy-700/80 dark:text-white/70 leading-relaxed">
            Real words from parents and students learning with us across more than 15
            countries.
          </p>
        </Reveal>

        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" stagger={0.1}>
          {/* FIX: alternating left/right slide-in instead of plain fade */}
          {TESTIMONIALS.map((t, i) => (
            <StaggerItem key={t.quote} direction={i % 2 === 0 ? "left" : "right"}>
              <Tilt3D max={7} scale={1.02} className="h-full">
                <figure className="glass rounded-2xl p-7 h-full shadow-3d hover:shadow-3d-hover transition-shadow duration-300 ease-premium flex flex-col">
                  <Quote className="text-gold-500/50" size={28} aria-hidden="true" />
                  <blockquote className="mt-4 text-sm sm:text-base text-navy-700/85 dark:text-white/80 leading-relaxed flex-1">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-6 pt-4 border-t border-navy-900/10 dark:border-cream/10">
                    <p className="font-heading text-sm font-semibold text-navy-900 dark:text-white">
                      {t.role}
                    </p>
                    <p className="text-xs text-gold-700 dark:text-gold-400 mt-0.5">{t.location}</p>
                  </figcaption>
                </figure>
              </Tilt3D>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
