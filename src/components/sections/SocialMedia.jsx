import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Reveal from "../ui/Reveal";
import { StaggerGroup, StaggerItem } from "../ui/Stagger";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  PinterestIcon,
  TikTokIcon,
  YoutubeIcon,
  XIcon,
} from "../ui/SocialIcons";

const EASE = [0.16, 1, 0.3, 1];

const PLATFORMS = [
  { label: "Facebook", icon: FacebookIcon, href: "https://www.facebook.com/profile.php?id=61591790594650" },
  { label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/maarifat_ul_uloom_academy?igsh=M3lvZmtzbmx3cnB6" },
  { label: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/company/maarifat-ul-uloom-academy/" },
  { label: "Pinterest", icon: PinterestIcon, href: "https://pin.it/4gwbnP8Il" },
  { label: "TikTok", icon: TikTokIcon, href: "https://tiktok.com/@maarifatululoomac" },
  { label: "YouTube", icon: YoutubeIcon, href: "https://www.youtube.com/@MaarifatUlUloomAcademy" },
  { label: "X (Twitter)", icon: XIcon, href: "https://x.com/MaarifatUlUloom" },
  { label: "WhatsApp Channel", icon: MessageCircle, href: "https://whatsapp.com/channel/0029Vb8Doae9xVJYnsMAuV2S" },
];

export default function SocialMedia() {
  return (
    <section className="py-20 lg:py-24 bg-white dark:bg-navy-800">
      <Container>
        <Reveal className="max-w-xl mx-auto text-center mb-12">
          <Eyebrow>Join Our Community</Eyebrow>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-navy-900 dark:text-white text-balance">
            Stay Connected With Us
          </h2>
          <p className="mt-4 text-sm sm:text-base text-navy-700/75 dark:text-white/70">
            Follow along for reminders, Islamic reflections, learning tips, and updates.
          </p>
        </Reveal>

        <StaggerGroup className="flex flex-wrap items-center justify-center gap-4 sm:gap-6" stagger={0.06}>
          {PLATFORMS.map((p) => (
            <StaggerItem key={p.label} direction="scale">
              <motion.a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.label}
                whileHover={{ y: -4, backgroundColor: "#C9973B", color: "#FFFFFF" }}
                transition={{ duration: 0.25, ease: EASE }}
                className="w-14 h-14 rounded-full bg-white dark:bg-navy-800 shadow-card flex items-center justify-center text-navy-900 dark:text-gold-400"
              >
                <p.icon size={20} />
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
