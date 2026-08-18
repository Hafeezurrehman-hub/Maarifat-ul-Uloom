MAARIFAT-UL-ULOOM WEBSITE — ALL EDITED/NEW FILES (combined)
=============================================================

Extract this zip and copy each file into your project at the SAME path
(overwrite the existing file). Folder structure matches your project.

MODIFIED FILES:
  tailwind.config.js                          - fixed hard/flat shadow lines (buttons & cards)
  src/App.jsx                                  - removed ComingSoon, added TrustMarquee/Teachers/Pricing
  src/index.css                                - overflow-x fix (mobile shift/cut bug)
  src/constants/site.js                        - added Teachers/Pricing to nav + footer links
  src/components/ui/Button.jsx                 - disabled state for form submit button
  src/components/ui/Reveal.jsx                 - smaller/faster reveal offsets
  src/components/ui/Stagger.jsx                - added left/right slide directions
  src/components/sections/Hero.jsx             - mobile perf fix, typing effect, lazy-loaded 3D book
  src/components/sections/About.jsx            - alternating slide-in cards
  src/components/sections/Courses.jsx          - REWRITTEN: grid instead of carousel
  src/components/sections/WhyChooseUs.jsx      - alternating slide-in cards
  src/components/sections/Testimonials.jsx     - alternating slide-in cards
  src/components/sections/Faq.jsx              - each question slides in individually
  src/components/sections/Contact.jsx          - centered mobile layout + Formspree submit

NEW FILES:
  src/components/ui/TypewriterText.jsx         - typing-effect text component
  src/components/ui/Marquee.jsx                - auto-scrolling text strip component
  src/components/sections/TrustMarquee.jsx     - scrolling strip shown under Hero
  src/components/sections/Teachers.jsx         - "Our Teaching Team" section (placeholder content)
  src/components/sections/Pricing.jsx          - fee plans section (PLACEHOLDER PRICES — edit before publishing)

DELETE THIS FILE (no longer used anywhere):
  src/components/sections/ComingSoon.jsx

STILL NEEDS YOUR INPUT BEFORE GOING LIVE:
  1. src/components/sections/Pricing.jsx  -> replace placeholder prices ($20/$35/$55) with real ones
  2. src/components/sections/Teachers.jsx -> replace with real teacher names/photos when ready
  3. src/components/sections/Contact.jsx  -> replace "YOUR_FORM_ID" with your real Formspree ID
     (sign up free at https://formspree.io) — until then it safely falls back to the old
     mailto behavior, so nothing breaks if you skip this step.

After copying files in, run: npm run build
