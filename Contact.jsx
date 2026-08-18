import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Copy, Check, Globe, Wallet, Clock, Gift } from "lucide-react";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { SITE } from "../../constants/site";

const EASE = [0.16, 1, 0.3, 1];

function CopyRow({ icon: IconCmp, label, value, href }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-navy-900/10 dark:border-cream/10 last:border-0">
      <a href={href} className="flex items-center gap-3 text-navy-900 dark:text-white hover:text-gold-700 transition-colors duration-200 min-w-0">
        <span className="w-9 h-9 rounded-full bg-white dark:bg-navy-800 flex items-center justify-center shrink-0">
          <IconCmp size={16} className="text-gold-700" />
        </span>
        <span className="min-w-0">
          <span className="block text-xs text-navy-700/60 dark:text-white/70">{label}</span>
          <span className="block text-sm font-medium truncate">{value}</span>
        </span>
      </a>
      <button
        onClick={handleCopy}
        aria-label={`Copy ${label}`}
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-navy-700/50 dark:text-white/70 hover:text-gold-700 hover:bg-white dark:hover:bg-navy-700 transition-colors duration-200"
      >
        {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
      </button>
    </div>
  );
}

const reassurance = [
  { icon: Globe, label: "Worldwide Classes" },
  { icon: Wallet, label: "Simple Monthly Fee" },
  { icon: Clock, label: "Flexible Timings" },
  { icon: Gift, label: "Free Trial Available" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "", message: "" });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens the visitor's email client with a pre-filled message to SITE.email.
    // This guarantees the enquiry is actually delivered with zero backend setup.
    // For a fully automated inbox (no email client required), swap this for a
    // form service like Formspree or EmailJS and POST `form` there instead.
    const subject = encodeURIComponent(
      `New enquiry from ${form.name || "website visitor"}${form.course ? ` — ${form.course}` : ""}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "-"}\nCourse of Interest: ${form.course || "-"}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center dark:hidden"
        style={{
          backgroundImage:
            `linear-gradient(rgba(250,249,246,0.55), rgba(250,249,246,0.85)), url('${import.meta.env.BASE_URL}images/contact-bg.jpg')`,
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center hidden dark:block"
        style={{
          backgroundImage:
            `linear-gradient(rgba(20,28,48,0.96), rgba(20,28,48,0.98)), url('${import.meta.env.BASE_URL}images/contact-bg.jpg')`,
        }}
      />
      <Container className="relative">
        <Reveal className="max-w-2xl mx-auto text-center mb-16">
          <Eyebrow>Get In Touch</Eyebrow>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-900 dark:text-white text-balance">
            Let's Begin Your Journey Together
          </h2>
          <p className="mt-5 text-navy-700/80 dark:text-white/70 leading-relaxed">
            Whether you have a question about our courses, want to schedule a free trial, or need
            help choosing the right class — we're one message away.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto w-full">
          <Reveal direction="left" className="w-full">
            <div className="bg-white dark:bg-navy-800/90 backdrop-blur-sm rounded-2xl shadow-card p-7 sm:p-8 w-full">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="h-full flex flex-col items-center justify-center text-center py-16"
                >
                  <Check className="text-gold-500 mb-3" size={36} />
                  <p className="font-heading text-lg font-semibold text-navy-900 dark:text-white">
                    Message received!
                  </p>
                  <p className="text-sm text-navy-700/70 dark:text-white/70 mt-1">
                    We'll respond within a few hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-navy-700/70 dark:text-white/70 mb-1.5">Name</label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-navy-900/15 dark:border-cream/10 bg-white dark:bg-navy-900/60 text-navy-900 dark:text-white placeholder:text-navy-700/40 dark:placeholder:text-cream/40 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy-700/70 dark:text-white/70 mb-1.5">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-navy-900/15 dark:border-cream/10 bg-white dark:bg-navy-900/60 text-navy-900 dark:text-white placeholder:text-navy-700/40 dark:placeholder:text-cream/40 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy-700/70 dark:text-white/70 mb-1.5">Phone (optional)</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-navy-900/15 dark:border-cream/10 bg-white dark:bg-navy-900/60 text-navy-900 dark:text-white placeholder:text-navy-700/40 dark:placeholder:text-cream/40 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy-700/70 dark:text-white/70 mb-1.5">Course of Interest</label>
                    <select
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-navy-900/15 dark:border-cream/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors bg-white dark:bg-navy-900/60 text-navy-900 dark:text-white"
                    >
                      <option value="">Select a course</option>
                      <option>Noorani Qaida</option>
                      <option>Quran Reading</option>
                      <option>Tajweed</option>
                      <option>Hifz Support</option>
                      <option>Islamic Studies</option>
                      <option>Arabic Language</option>
                      <option>English Language</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy-700/70 dark:text-white/70 mb-1.5">Message</label>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-navy-900/15 dark:border-cream/10 bg-white dark:bg-navy-900/60 text-navy-900 dark:text-white placeholder:text-navy-700/40 dark:placeholder:text-cream/40 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors resize-none"
                    />
                  </div>
                  <Button type="submit" variant="primary" className="w-full justify-center">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1} className="w-full">
            <div className="bg-white dark:bg-navy-800/90 backdrop-blur-sm rounded-2xl p-7 sm:p-8 h-full w-full flex flex-col shadow-card">
              <h3 className="font-heading text-lg font-semibold text-navy-900 dark:text-white mb-4">Contact Details</h3>
              <div>
                <CopyRow icon={Phone} label="Male Inquiries" value={SITE.phoneMale} href={`tel:${SITE.phoneMale.replace(/\s/g, "")}`} />
                <CopyRow icon={Phone} label="Female Inquiries" value={SITE.phoneFemale} href={`tel:${SITE.phoneFemale.replace(/\s/g, "")}`} />
                <CopyRow icon={Mail} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
              </div>

              <a
                href={SITE.whatsappMale}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5"
              >
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="flex items-center justify-center gap-2 w-full bg-gold-500 hover:bg-gold-400 transition-colors duration-300 text-navy-900 font-medium text-sm px-6 py-3 rounded-full"
                >
                  <MessageCircle size={17} />
                  Chat on WhatsApp
                </motion.span>
              </a>

              <div className="mt-6 pt-6 border-t border-navy-900/10 dark:border-cream/10 grid grid-cols-2 gap-3">
                {reassurance.map((r) => (
                  <div key={r.label} className="flex items-center gap-2 text-xs text-navy-700/70 dark:text-white/70">
                    <r.icon size={14} className="text-gold-700 shrink-0" />
                    {r.label}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
