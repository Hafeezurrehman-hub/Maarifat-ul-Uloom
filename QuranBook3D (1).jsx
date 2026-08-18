import { useEffect, useRef } from "react";
import { motion, useTransform } from "framer-motion";

export default function QuranBook3D({ progress, className = "" }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({ progress: 0 });

  useEffect(() => {
    const unsubscribe = progress.on("change", (v) => {
      stateRef.current.progress = v;
    });
    return unsubscribe;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── color palette (matches reference photo) ────────────────────────────
    const NAVY_DEEP   = "#0D1526";
    const NAVY_MID    = "#1A2540";
    const NAVY_COVER  = "#162038";
    const GOLD_BRIGHT = "#D4A843";
    const GOLD_MID    = "#B8892E";
    const GOLD_DARK   = "#8A6420";
    const GOLD_LIGHT  = "#F0CC78";
    const CREAM       = "#FBF5E6";
    const CREAM_DARK  = "#EDE0C2";

    // ── Islamic arabesque petal helper ─────────────────────────────────────
    function drawArabesque(ctx, cx, cy, r, petals, opacity) {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = GOLD_BRIGHT;
      ctx.lineWidth = 0.9;
      ctx.fillStyle = "rgba(212,168,67,0.07)";
      for (let i = 0; i < petals; i++) {
        const a = (i / petals) * Math.PI * 2;
        ctx.beginPath();
        ctx.ellipse(
          cx + Math.cos(a) * r * 0.45,
          cy + Math.sin(a) * r * 0.45,
          r * 0.55, r * 0.22, a, 0, Math.PI * 2
        );
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();
    }

    // ── 8-point Islamic star ───────────────────────────────────────────────
    function drawStar(ctx, cx, cy, outerR, innerR, color, opacity) {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.fillStyle = color.replace(")", ",0.12)").replace("rgb","rgba");
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      for (let i = 0; i < 16; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const a = (i * Math.PI) / 8 - Math.PI / 2;
        if (i === 0) ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
        else ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // outer rings
      ctx.beginPath(); ctx.arc(cx, cy, outerR * 1.18, 0, Math.PI * 2);
      ctx.globalAlpha = opacity * 0.4; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, outerR * 1.38, 0, Math.PI * 2);
      ctx.globalAlpha = opacity * 0.2; ctx.stroke();
      ctx.restore();
    }

    // ── ornate border frame ────────────────────────────────────────────────
    function drawOrnateFrame(ctx, x, y, w, h, opacity) {
      ctx.save();
      ctx.globalAlpha = opacity;

      // outer frame
      const grad = ctx.createLinearGradient(x, y, x + w, y + h);
      grad.addColorStop(0,   GOLD_LIGHT);
      grad.addColorStop(0.25, GOLD_BRIGHT);
      grad.addColorStop(0.5,  GOLD_LIGHT);
      grad.addColorStop(0.75, GOLD_BRIGHT);
      grad.addColorStop(1,   GOLD_LIGHT);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, w, h);

      // second inner frame
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = opacity * 0.7;
      ctx.strokeRect(x + 6, y + 6, w - 12, h - 12);

      // third inner frame
      ctx.lineWidth = 0.7;
      ctx.globalAlpha = opacity * 0.4;
      ctx.strokeRect(x + 11, y + 11, w - 22, h - 22);

      // corner diamond ornaments
      const corners = [
        [x, y], [x + w, y], [x, y + h], [x + w, y + h]
      ];
      corners.forEach(([cx, cy]) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.globalAlpha = opacity * 0.9;
        ctx.strokeStyle = GOLD_BRIGHT;
        ctx.lineWidth = 1.5;
        ctx.fillStyle = GOLD_DARK;
        // small diamond
        ctx.beginPath();
        ctx.moveTo(0, -10); ctx.lineTo(10, 0);
        ctx.lineTo(0, 10);  ctx.lineTo(-10, 0);
        ctx.closePath();
        ctx.fill(); ctx.stroke();
        ctx.restore();
      });

      // side mid ornaments (small diamonds)
      const sides = [
        [x + w / 2, y], [x + w / 2, y + h],
        [x, y + h / 2], [x + w, y + h / 2]
      ];
      sides.forEach(([cx, cy]) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.globalAlpha = opacity * 0.7;
        ctx.strokeStyle = GOLD_BRIGHT;
        ctx.lineWidth = 1;
        ctx.fillStyle = GOLD_DARK;
        ctx.beginPath();
        ctx.moveTo(0, -6); ctx.lineTo(6, 0);
        ctx.lineTo(0, 6);  ctx.lineTo(-6, 0);
        ctx.closePath();
        ctx.fill(); ctx.stroke();
        ctx.restore();
      });

      ctx.restore();
    }

    // ── intricate arabesque scroll fill ───────────────────────────────────
    function drawScrollFill(ctx, x, y, w, h, opacity) {
      ctx.save();
      ctx.globalAlpha = opacity * 0.25;
      ctx.strokeStyle = GOLD_BRIGHT;
      ctx.lineWidth = 0.6;
      // repeating arabesque curves
      const cols = Math.ceil(w / 30);
      const rows = Math.ceil(h / 30);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = x + c * 30 + 15;
          const py = y + r * 30 + 15;
          ctx.beginPath();
          ctx.arc(px, py, 10, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(px - 10, py);
          ctx.bezierCurveTo(px - 5, py - 10, px + 5, py - 10, px + 10, py);
          ctx.bezierCurveTo(px + 5, py + 10, px - 5, py + 10, px - 10, py);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    // ── draw the central medallion (like reference photo) ─────────────────
    function drawCentralMedallion(ctx, cx, cy, r, opacity) {
      ctx.save();

      // outer petals / arabesque
      drawArabesque(ctx, cx, cy, r, 16, opacity * 0.5);

      // main medallion background
      ctx.globalAlpha = opacity;
      const mGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      mGrad.addColorStop(0,   NAVY_COVER);
      mGrad.addColorStop(0.6, NAVY_MID);
      mGrad.addColorStop(1,   NAVY_DEEP);
      ctx.fillStyle = mGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // outer gold ring
      ctx.strokeStyle = GOLD_BRIGHT;
      ctx.lineWidth = 2;
      ctx.stroke();

      // 16-petal flower ring
      ctx.globalAlpha = opacity * 0.7;
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2;
        ctx.beginPath();
        ctx.ellipse(
          cx + Math.cos(a) * r * 0.72,
          cy + Math.sin(a) * r * 0.72,
          r * 0.18, r * 0.08, a, 0, Math.PI * 2
        );
        ctx.strokeStyle = GOLD_MID;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // 8-point star
      drawStar(ctx, cx, cy, r * 0.48, r * 0.22, GOLD_BRIGHT, opacity * 0.9);

      // inner navy circle
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.32, 0, Math.PI * 2);
      ctx.fillStyle = NAVY_DEEP;
      ctx.fill();
      ctx.strokeStyle = GOLD_BRIGHT;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Arabic "Al-Quran" text in center
      ctx.globalAlpha = opacity * 0.9;
      ctx.fillStyle = GOLD_LIGHT;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `bold ${r * 0.22}px 'Amiri', 'Arial', serif`;
      ctx.fillText("القرآن", cx, cy);

      ctx.restore();
    }

    // ── draw realistic Quran book cover ───────────────────────────────────
    function drawQuranCover(ctx, x, y, w, h, tiltX, tiltY, shadow, opacity) {
      ctx.save();
      ctx.globalAlpha = opacity;

      // Drop shadow
      ctx.shadowColor = "rgba(0,0,0,0.7)";
      ctx.shadowBlur = shadow;
      ctx.shadowOffsetX = 10;
      ctx.shadowOffsetY = 16;

      // Main cover gradient (navy deep to mid)
      const coverGrad = ctx.createLinearGradient(x, y, x + w, y + h);
      coverGrad.addColorStop(0,    "#0A1020");
      coverGrad.addColorStop(0.15, "#1A2540");
      coverGrad.addColorStop(0.5,  "#162038");
      coverGrad.addColorStop(0.85, "#0E1830");
      coverGrad.addColorStop(1,    "#080E1C");
      ctx.fillStyle = coverGrad;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 4);
      ctx.fill();

      ctx.shadowColor = "transparent";

      // Leather texture sheen
      const sheen = ctx.createLinearGradient(x, y, x + w * 0.4, y);
      sheen.addColorStop(0, "rgba(255,255,255,0.06)");
      sheen.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = sheen;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 4);
      ctx.fill();

      // ── Outer ornate border (gold) ─────────────────────────────────────
      const bPad = w * 0.05;
      drawOrnateFrame(ctx, x + bPad, y + bPad, w - bPad * 2, h - bPad * 2, opacity * 0.95);

      // ── Inner arabesque scroll fill ────────────────────────────────────
      const iPad = bPad + w * 0.07;
      drawScrollFill(ctx, x + iPad, y + iPad, w - iPad * 2, h - iPad * 2, opacity * 0.6);

      // ── Central medallion ──────────────────────────────────────────────
      const medR = Math.min(w, h) * 0.22;
      const medCX = x + w / 2;
      const medCY = y + h * 0.42;
      drawCentralMedallion(ctx, medCX, medCY, medR, opacity);

      // ── Top teardrop ornament ──────────────────────────────────────────
      ctx.globalAlpha = opacity * 0.85;
      ctx.fillStyle = GOLD_DARK;
      ctx.strokeStyle = GOLD_BRIGHT;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(medCX, medCY - medR * 1.28, medR * 0.14, medR * 0.22, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      // small diamond above
      ctx.beginPath();
      ctx.moveTo(medCX, medCY - medR * 1.6);
      ctx.lineTo(medCX + medR * 0.08, medCY - medR * 1.45);
      ctx.lineTo(medCX, medCY - medR * 1.32);
      ctx.lineTo(medCX - medR * 0.08, medCY - medR * 1.45);
      ctx.closePath();
      ctx.fill(); ctx.stroke();

      // ── "Al-Quran Al-Kareem" text below medallion ──────────────────────
      ctx.globalAlpha = opacity * 0.8;
      ctx.fillStyle = GOLD_LIGHT;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${w * 0.06}px 'Amiri', serif`;
      ctx.fillText("الْقُرْآنُ الْكَرِيمُ", x + w / 2, y + h * 0.72);

      // ── Spine strip ────────────────────────────────────────────────────
      const spineW = w * 0.04;
      const spineGrad = ctx.createLinearGradient(x, 0, x + spineW, 0);
      spineGrad.addColorStop(0,   "#050C18");
      spineGrad.addColorStop(0.4, "#2A3F60");
      spineGrad.addColorStop(1,   "#0A1525");
      ctx.globalAlpha = opacity;
      ctx.fillStyle = spineGrad;
      ctx.fillRect(x, y, spineW, h);

      // Spine gold line
      ctx.strokeStyle = GOLD_MID;
      ctx.lineWidth = 1;
      ctx.globalAlpha = opacity * 0.6;
      ctx.beginPath();
      ctx.moveTo(x + spineW - 2, y + h * 0.08);
      ctx.lineTo(x + spineW - 2, y + h * 0.92);
      ctx.stroke();

      // ── Bookmark ribbon ────────────────────────────────────────────────
      const bkX = x + w * 0.78;
      ctx.globalAlpha = opacity * 0.85;
      ctx.fillStyle = GOLD_MID;
      ctx.beginPath();
      ctx.moveTo(bkX - 5, y + h - 2);
      ctx.lineTo(bkX + 5, y + h - 2);
      ctx.lineTo(bkX + 5, y + h + 28);
      ctx.lineTo(bkX, y + h + 22);
      ctx.lineTo(bkX - 5, y + h + 28);
      ctx.closePath();
      ctx.fill();
      // Tassel
      ctx.strokeStyle = GOLD_LIGHT;
      ctx.lineWidth = 1;
      for (let i = -3; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(bkX + i * 1.2, y + h + 22);
        ctx.lineTo(bkX + i * 2 + (Math.random() - 0.5) * 4, y + h + 38);
        ctx.stroke();
      }

      ctx.restore();
    }

    // ── Page turn ─────────────────────────────────────────────────────────
    function drawPageTurn(ctx, W, H, bookX, bookY, bookW, bookH, t, idx) {
      if (t <= 0) return;

      const spineX = bookX + bookW * 0.04;
      const pageH = bookH;
      const pageW = bookW * 0.5;

      const curlT = Math.min(t, 1);
      const flipX = spineX + pageW * (1 - curlT);
      const curl = Math.sin(curlT * Math.PI) * pageH * 0.12;

      // shadow under turning page
      ctx.save();
      ctx.globalAlpha = Math.sin(curlT * Math.PI) * 0.35;
      const sg = ctx.createRadialGradient(flipX, bookY + pageH / 2, 5, flipX, bookY + pageH / 2, pageW * 0.5);
      sg.addColorStop(0, "rgba(0,0,0,0.5)");
      sg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = sg;
      ctx.fillRect(spineX, bookY, pageW * 1.2, pageH);
      ctx.restore();

      // page shape
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(spineX, bookY);
      ctx.bezierCurveTo(flipX, bookY - curl, flipX, bookY + pageH + curl, spineX, bookY + pageH);
      // left turned side
      const leftX = spineX - pageW * curlT * 0.55;
      ctx.lineTo(leftX, bookY + pageH + curl * 0.4);
      ctx.bezierCurveTo(leftX - 10, bookY + pageH, leftX - 10, bookY, leftX, bookY - curl * 0.4);
      ctx.closePath();

      const pg = ctx.createLinearGradient(leftX, 0, flipX, 0);
      pg.addColorStop(0, CREAM_DARK);
      pg.addColorStop(0.4, CREAM);
      pg.addColorStop(1, "#EAD9B0");
      ctx.fillStyle = pg;
      ctx.shadowColor = "rgba(0,0,0,0.4)";
      ctx.shadowBlur = 20;
      ctx.fill();

      // page content on back
      if (curlT > 0.35) {
        const fo = Math.min((curlT - 0.35) / 0.4, 1);
        const pcx = (spineX + leftX) / 2;
        const pw = Math.abs(leftX - spineX);
        if (pw > 30) {
          drawStar(ctx, pcx, bookY + pageH * 0.3, pw * 0.15, pw * 0.07, GOLD_MID, fo * 0.5);
          // text lines
          ctx.globalAlpha = fo * 0.2;
          ctx.strokeStyle = "#1F2A44";
          ctx.lineWidth = 1.5;
          ctx.lineCap = "round";
          for (let i = 0; i < 7; i++) {
            const lw = (i % 3 === 0 ? 0.6 : 0.9) * pw * 0.7;
            ctx.beginPath();
            ctx.moveTo(pcx - lw / 2, bookY + pageH * 0.5 + i * 18);
            ctx.lineTo(pcx + lw / 2, bookY + pageH * 0.5 + i * 18);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    }

    // ── Main render loop ──────────────────────────────────────────────────
    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      const prog = stateRef.current.progress;

      ctx.clearRect(0, 0, W, H);

      // Deep background
      const bgGrad = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.8);
      bgGrad.addColorStop(0, "#1A1020");
      bgGrad.addColorStop(0.5, "#0D0A18");
      bgGrad.addColorStop(1, "#060410");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Subtle warm cloth texture suggestion
      ctx.save();
      ctx.globalAlpha = 0.06;
      for (let i = 0; i < H; i += 4) {
        ctx.fillStyle = i % 8 === 0 ? "#3D1515" : "#2A0E0E";
        ctx.fillRect(0, i, W, 2);
      }
      ctx.restore();

      // Vignette
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.15, W / 2, H / 2, H * 0.85);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // ── Book position & size ───────────────────────────────────────────
      const isMobile = W < 640;
      const isTablet = W < 1024;
      const maxH = isMobile ? Math.min(H * 0.55, 320) : isTablet ? Math.min(H * 0.65, 420) : Math.min(H * 0.78, 540);
      const bookH = maxH;
      const bookW = bookH * 0.68;
      const bookX = W / 2 - bookW / 2;
      const bookY = isMobile ? H * 0.22 : H / 2 - bookH / 2;

      // Slight perspective tilt (eases off as pages turn)
      const tilt = (1 - prog * 0.6);
      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.transform(1, 0, -0.08 * tilt, 1, 0, 0); // skew for 3D look
      ctx.translate(-W / 2, -H / 2);

      // Gold ambient glow behind book
      const glow = ctx.createRadialGradient(W / 2, H / 2, 10, W / 2, H / 2, bookH * 0.7);
      glow.addColorStop(0, `rgba(180,130,30,${0.08 + prog * 0.1})`);
      glow.addColorStop(1, "rgba(180,130,30,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // Draw the Quran book
      drawQuranCover(ctx, bookX, bookY, bookW, bookH, 0, 0, 60, 1);

      // ── Turning pages (5 pages) ────────────────────────────────────────
      const PAGE_COUNT = 5;
      for (let i = PAGE_COUNT - 1; i >= 0; i--) {
        const start = i / PAGE_COUNT;
        const t = Math.max(0, Math.min(1, (prog - start) / (1 / PAGE_COUNT)));
        drawPageTurn(ctx, W, H, bookX, bookY, bookW, bookH, t, i);
      }

      ctx.restore();

      // Book drop shadow on cloth
      ctx.save();
      ctx.globalAlpha = 0.4;
      const dropShadow = ctx.createEllipse
        ? null
        : (() => {
            const s = ctx.createRadialGradient(W / 2, bookY + bookH + 10, 5, W / 2, bookY + bookH + 10, bookW * 0.6);
            s.addColorStop(0, "rgba(0,0,0,0.5)");
            s.addColorStop(1, "rgba(0,0,0,0)");
            return s;
          })();
      if (dropShadow) {
        ctx.fillStyle = dropShadow;
        ctx.fillRect(bookX - 40, bookY + bookH - 5, bookW + 80, 40);
      }
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: "block" }}
    />
  );
}
