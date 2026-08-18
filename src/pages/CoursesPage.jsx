import PageBanner from "../components/ui/PageBanner";
import { motion } from "framer-motion";
import Container from "../components/ui/Container";
import Eyebrow from "../components/ui/Eyebrow";
import Icon from "../components/ui/Icon";
import { StaggerGroup, StaggerItem } from "../components/ui/Stagger";
import Tilt3D from "../components/ui/Tilt3D";
import { COURSES } from "../data/courses";
import { Link } from "react-router-dom";

const EASE = [0.16, 1, 0.3, 1];

export default function CoursesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our Courses"
        title="A Course for Every Stage of the Journey"
        subtitle="From first letters to full memorization — structured learning paths designed around your pace, age, and goals."
      />

      <section className="py-24 lg:py-32 bg-cream-light dark:bg-navy-900">
        <Container>
          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" stagger={0.08}>
            {COURSES.map((course) => (
              <StaggerItem key={course.title}>
                <Tilt3D max={8} scale={1.02} className="h-full">
                  <div className="glass rounded-2xl p-8 h-full shadow-3d hover:shadow-3d-hover transition-shadow duration-300 ease-premium flex flex-col">
                    <motion.div
                      style={{ transform: "translateZ(30px)" }}
                      whileHover={{ scale: 1.1, rotate: 4 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="w-14 h-14 rounded-2xl bg-gold-200/60 shadow-gold flex items-center justify-center mb-5"
                    >
                      <Icon name={course.icon} className="text-gold-700" size={26} />
                    </motion.div>
                    <h3 style={{ transform: "translateZ(20px)" }} className="font-heading text-xl font-semibold text-navy-900 dark:text-white mb-3">
                      {course.title}
                    </h3>
                    <p style={{ transform: "translateZ(10px)" }} className="text-navy-700/75 dark:text-white/70 leading-relaxed text-sm flex-1">
                      {course.description}
                    </p>
                    <Link
                      to="/contact"
                      style={{ transform: "translateZ(20px)" }}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-600 transition-colors"
                    >
                      Enroll in this course <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </Tilt3D>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-16 text-center">
            <p className="text-navy-700/70 dark:text-white/60 mb-6 text-sm sm:text-base">
              Not sure which course is right for you? Book a free trial and we'll guide you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold px-8 py-4 rounded-full transition-colors duration-300"
            >
              Book a Free Trial Class <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
