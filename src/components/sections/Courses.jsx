import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";
import Tilt3D from "../ui/Tilt3D";
import { StaggerGroup, StaggerItem } from "../ui/Stagger";
import { COURSES } from "../../data/courses";

export default function Courses() {
  return (
    <section id="courses" className="py-24 lg:py-32 bg-white dark:bg-navy-800 overflow-hidden">
      <Container>
        <Reveal className="max-w-2xl mx-auto text-center mb-16">
          <Eyebrow>Our Courses</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-900 dark:text-white text-balance">
            A Course for Every Stage of the Journey
          </h2>
          <p className="mt-5 text-navy-700/80 dark:text-white/70 leading-relaxed">
            From first letters to full memorization — structured learning paths designed around
            your pace, age, and goals.
          </p>
        </Reveal>

        {/* FIX: replaced the single auto-rotating card with a full grid so
            visitors can see and compare every course at once, instead of
            waiting for a carousel to cycle through them. */}
        <StaggerGroup
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
          stagger={0.08}
        >
          {COURSES.map((course, i) => (
            <StaggerItem key={course.title} direction={i % 2 === 0 ? "left" : "right"}>
              <Tilt3D max={8} scale={1.02} className="h-full">
                <a
                  href="#contact"
                  className="glass block h-full rounded-2xl p-7 shadow-3d hover:shadow-3d-hover transition-shadow duration-300 ease-premium"
                >
                  <div
                    style={{ transform: "translateZ(30px)" }}
                    className="w-12 h-12 rounded-xl bg-gold-200/60 shadow-gold flex items-center justify-center mb-5"
                  >
                    <Icon name={course.icon} className="text-gold-700" size={24} />
                  </div>
                  <h3
                    style={{ transform: "translateZ(20px)" }}
                    className="font-heading text-lg font-semibold text-navy-900 dark:text-white mb-2"
                  >
                    {course.title}
                  </h3>
                  <p
                    style={{ transform: "translateZ(10px)" }}
                    className="text-sm text-navy-700/75 dark:text-white/70 leading-relaxed mb-4"
                  >
                    {course.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold-700">
                    Learn More <span aria-hidden="true">→</span>
                  </span>
                </a>
              </Tilt3D>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
