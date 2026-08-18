import { useState } from "react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import { StaggerGroup, StaggerItem } from "../ui/Stagger";
import Icon from "../ui/Icon";
import { DIGITAL_SKILLS } from "../../data/misc";
import { SITE } from "../../constants/site";

const EASE = [0.16, 1, 0.3, 1];

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // Sends the waitlist request straight to SITE.email via the visitor's mail
    // client — a zero-backend way to actually capture the signup. For fully
    // automated list-building (no email client required), swap this for a
    // provider like Mailchimp/ConvertKit and POST `email` to their API instead.
    const subject = encodeURIComponent("Digital Skills Academy — Notify Me at Launch");
    const body = encodeURIComponent(`Please add this email to the launch waitlist: ${email}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section className="relative py-24 lg:py-32 bg-navy-900 overflow-hidden">
      {/* Diagonal top divider from the white Courses section above */}
      <div
        className="absolute -top-1 left-0 right-0 h-16 bg-white"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 100%)" }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <Reveal className="max-w-2xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-gold-200 border border-gold-500/40 mb-6 overflow-hidden"
          >
            <span className="relative z-10">✦ Coming Soon</span>
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-400/30 to-transparent bg-[length:200%_100%] animate-shimmer"
              aria-hidden="true"
            />
          </motion.span>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white text-balance">
            Modern Skills. Rooted in Faith. Coming Soon.
          </h2>
          <p className="mt-5 text-white/70 leading-relaxed">
            Alongside your Quranic education, we're building a Digital Skills Academy —
            practical, modern training grounded in the same values you trust us for.
          </p>
        </Reveal>

        <StaggerGroup
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
          stagger={0.06}
        >
          {DIGITAL_SKILLS.map((skill) => (
            <StaggerItem key={skill.label}>
              <motion.div
                whileHover={{ y: -3, backgroundColor: "rgba(201,151,59,0.15)" }}
                transition={{ duration: 0.25, ease: EASE }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gold-500/30 bg-white/5"
              >
                <Icon name={skill.icon} size={16} className="text-gold-400" />
                <span className="text-sm text-white/85">{skill.label}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.2} className="mt-12 max-w-md mx-auto">
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 sm:rounded-full sm:bg-white/5 sm:border sm:border-white/10 sm:p-1.5"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
                className="flex-1 bg-white/10 sm:bg-transparent rounded-full sm:rounded-l-full px-5 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/60"
              />
              <button
                type="submit"
                className="bg-gold-500 hover:bg-gold-400 transition-colors duration-300 ease-premium text-navy-900 font-medium text-sm px-6 py-3 rounded-full whitespace-nowrap"
              >
                Notify Me at Launch
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="text-center text-gold-300 flex items-center justify-center gap-2 text-sm"
            >
              <Icon name="CheckCircle2" size={18} />
              You're on the list! We'll email you when we launch.
            </motion.div>
          )}
          <p className="mt-3 text-center text-xs text-white/40">
            No spam — just one email when we're ready to welcome you in.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
