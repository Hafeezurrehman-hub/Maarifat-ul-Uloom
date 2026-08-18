import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";
import Tilt3D from "../ui/Tilt3D";
import { StaggerGroup, StaggerItem } from "../ui/Stagger";

// NOTE: Update this list with your actual teachers' names/photos once you
// have them ready — right now it introduces the teaching TEAM by category
// (rather than inventing fake individual profiles), which is the safest
// way to build trust before real headshots/bios are available.
const TEAM = [
  {
    icon: "UserRound",
    title: "Male Quran Teachers",
    text: "Certified in Tajweed and Hifz, experienced teaching students of all ages worldwide.",
  },
  {
    icon: "UserRound",
    title: "Female Quran Teachers",
    text: "Dedicated instructors for female students and young children, in a comfortable, respectful setting.",
  },
  {
    icon: "GraduationCap",
    title: "Islamic Studies Teachers",
    text: "Grounded in Aqeedah, Seerah, and Fiqh — making knowledge practical and easy to apply daily.",
  },
  {
    icon: "Languages",
    title: "Arabic & English Teachers",
    text: "Structured language instruction that supports both Quranic understanding and academic skills.",
  },
];

export default function Teachers() {
  return (
    <section id="teachers" className="relative py-24 lg:py-32 bg-cream-light dark:bg-navy-900 overflow-hidden">
      <Container>
        <Reveal className="max-w-2xl mx-auto text-center mb-16">
          <Eyebrow>Our Teaching Team</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-900 dark:text-white text-balance">
            Taught by Certified, Caring Instructors
          </h2>
          <p className="mt-5 text-navy-700/80 dark:text-white/70 leading-relaxed">
            Every teacher is vetted for both Quranic qualification and real teaching ability —
            so you always know who's guiding your child.
          </p>
        </Reveal>

        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6" stagger={0.08}>
          {TEAM.map((m, i) => (
            <StaggerItem key={m.title} direction={i % 2 === 0 ? "left" : "right"}>
              <Tilt3D max={9} scale={1.025} className="h-full">
                <div className="glass rounded-2xl p-6 h-full shadow-3d hover:shadow-3d-hover transition-shadow duration-300 ease-premium text-center">
                  <div
                    style={{ transform: "translateZ(30px)" }}
                    className="w-14 h-14 mx-auto rounded-full bg-gold-200/70 shadow-gold flex items-center justify-center mb-4"
                  >
                    <Icon name={m.icon} className="text-gold-700" size={24} />
                  </div>
                  <h3
                    style={{ transform: "translateZ(20px)" }}
                    className="font-heading text-base font-semibold text-navy-900 dark:text-white mb-1.5"
                  >
                    {m.title}
                  </h3>
                  <p
                    style={{ transform: "translateZ(10px)" }}
                    className="text-xs sm:text-sm text-navy-700/70 dark:text-white/70 leading-relaxed"
                  >
                    {m.text}
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
