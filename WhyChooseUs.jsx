import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { StaggerGroup, StaggerItem } from "../ui/Stagger";
import Icon from "../ui/Icon";
import Tilt3D from "../ui/Tilt3D";
import { WHY_CHOOSE_US } from "../../data/whyChooseUs";

export default function WhyChooseUs() {
  return (
    <section
      id="trust"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center dark:hidden"
        style={{
          backgroundImage:
            `linear-gradient(rgba(250,249,246,0.88), rgba(250,249,246,0.92)), url('${import.meta.env.BASE_URL}images/why-choose-bg.jpg')`,
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center hidden dark:block"
        style={{
          backgroundImage:
            `linear-gradient(rgba(20,28,48,0.96), rgba(20,28,48,0.98)), url('${import.meta.env.BASE_URL}images/why-choose-bg.jpg')`,
        }}
      />
      <Container className="relative">
        <Reveal className="max-w-2xl mx-auto text-center mb-16">
          <Eyebrow>Why Choose Us</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-900 dark:text-white text-balance">
            Why Families Trust Maarifat-ul-Uloom
          </h2>
          <p className="mt-5 text-navy-700/80 dark:text-white/70 leading-relaxed">
            Every detail — from who teaches to how progress is tracked — is designed around one
            goal: your comfort and your child's growth.
          </p>
        </Reveal>

        {/* FIX: grid-cols-1 on xs, grid-cols-2 from sm, grid-cols-4 from lg
                 Previous grid-cols-2 on mobile made cards too narrow on small phones */}
        <StaggerGroup
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          stagger={0.08}
        >
          {WHY_CHOOSE_US.map((item) => (
            <StaggerItem key={item.title}>
              <Tilt3D max={10} scale={1.03}>
                <div className="glass rounded-2xl p-6 h-full border border-transparent hover:border-gold-500/40 transition-colors duration-300 ease-premium shadow-3d hover:shadow-3d-hover">
                  <div
                    style={{ transform: "translateZ(30px)" }}
                    className="w-11 h-11 rounded-full bg-navy/5 dark:bg-cream/10 hover:bg-gold-200/50 dark:hover:bg-gold-500/25 flex items-center justify-center mb-4 transition-colors duration-300"
                  >
                    <Icon name={item.icon} className="text-navy dark:text-gold-400" size={20} />
                  </div>
                  <h3
                    style={{ transform: "translateZ(20px)" }}
                    className="font-heading text-base font-semibold text-navy-900 dark:text-white mb-1.5"
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{ transform: "translateZ(10px)" }}
                    className="text-xs sm:text-sm text-navy-700/70 dark:text-white/70 leading-relaxed"
                  >
                    {item.description}
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
