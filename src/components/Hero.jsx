import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap, Play, ChevronDown } from 'lucide-react';

// ---------------------------------------------------------------------------
// Particle data - generated once at module level so values are stable across
// renders and React StrictMode double-invocations.
// ---------------------------------------------------------------------------
const PARTICLE_COUNT = 36;

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  // horizontal start position as % of viewport width
  left: randomBetween(2, 98),
  // vertical start position — spread across the full hero height
  startY: randomBetween(10, 90),
  // how far upward each particle drifts (px)
  driftY: randomBetween(80, 220),
  // random horizontal sway (px)
  driftX: randomBetween(-40, 40),
  // size in px (2–4)
  size: randomBetween(2, 4),
  // ember (#FFB800) for ~1/3, spark (#FF6B00) for the rest
  color: i % 3 === 0 ? '#FFB800' : '#FF6B00',
  // base opacity before framer-motion animates it
  baseOpacity: randomBetween(0.3, 0.9),
  // animation duration
  duration: randomBetween(4, 9),
  // staggered start so not every particle moves at once
  delay: randomBetween(0, 6),
}));

// ---------------------------------------------------------------------------
// Stagger / reveal variants for the headline words
// ---------------------------------------------------------------------------
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Fade-up for supporting content (subtitle, buttons, scroll indicator)
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  },
});

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** A single animated ember/spark particle */
function Particle({ left, startY, driftY, driftX, size, color, baseOpacity, duration, delay }) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: `${startY}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        willChange: 'transform, opacity',
      }}
      animate={{
        y: [-driftY * 0.1, -driftY],
        x: [0, driftX, driftX * 0.5, 0],
        opacity: [0, baseOpacity, baseOpacity * 0.7, 0],
        scale: [0.4, 1, 0.7, 0.2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.3, 0.7, 1],
      }}
    />
  );
}

/** Decorative glowing disc orb (right side) */
function DiscOrb() {
  return (
    <div
      aria-hidden="true"
      className="absolute right-[-8rem] top-1/2 -translate-y-1/2 w-[32rem] h-[32rem]
                 md:right-[-4rem] lg:right-[2rem] pointer-events-none"
    >
      {/* Outer blur glow */}
      <div
        className="absolute inset-0 rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(255,107,0,0.18) 0%, rgba(255,184,0,0.08) 45%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Mid ring */}
      <div
        className="absolute inset-8 rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(255,107,0,0.12) 0%, rgba(255,184,0,0.05) 50%, transparent 70%)',
          border: '1px solid rgba(255,107,0,0.08)',
          filter: 'blur(12px)',
          animationDelay: '0.5s',
        }}
      />
      {/* Inner bright core */}
      <div
        className="absolute inset-24 rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(255,184,0,0.15) 0%, rgba(255,107,0,0.06) 60%, transparent 80%)',
          filter: 'blur(4px)',
          animationDelay: '1s',
        }}
      />
      {/* Disc ring outline */}
      <div
        className="absolute inset-16 rounded-full animate-float"
        style={{
          border: '1px solid rgba(255,107,0,0.12)',
          animationDelay: '0.8s',
        }}
      />
      <div
        className="absolute inset-24 rounded-full animate-float"
        style={{
          border: '1px solid rgba(255,184,0,0.08)',
          animationDelay: '1.2s',
        }}
      />
    </div>
  );
}

/** Subtle dot-grid texture overlay */
function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)',
      }}
    />
  );
}

/** Horizontal scan-line accent near the top */
function ScanLine() {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute top-[30%] left-0 right-0 h-px pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,107,0,0.15) 20%, rgba(255,184,0,0.2) 50%, rgba(255,107,0,0.15) 80%, transparent 100%)',
      }}
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/** Animated scroll indicator at the bottom */
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
      variants={fadeUp(1.6)}
      initial="hidden"
      animate="visible"
      onClick={() => {
        const el = document.getElementById('stats');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <span
        className="font-body text-xs tracking-[0.2em] uppercase"
        style={{ color: 'rgba(138,138,138,0.7)' }}
      >
        Scroll to explore
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ color: 'rgba(255,107,0,0.7)' }}
      >
        <ChevronDown size={20} />
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Hero component
// ---------------------------------------------------------------------------
export default function Hero() {
  // Memoize so the particle array is stable — not regenerated on re-renders
  const particles = useMemo(() => PARTICLES, []);

  function handleScrollToCourses() {
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function handleScrollToPreview() {
    const el = document.getElementById('instructors');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-overlay"
      aria-label="Hero"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Layer 0 — dot grid texture                                          */}
      {/* ------------------------------------------------------------------ */}
      <DotGrid />

      {/* ------------------------------------------------------------------ */}
      {/* Layer 0 — scan line accent                                          */}
      {/* ------------------------------------------------------------------ */}
      <ScanLine />

      {/* ------------------------------------------------------------------ */}
      {/* Layer 0 — floating particles                                        */}
      {/* ------------------------------------------------------------------ */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((p) => (
          <Particle key={p.id} {...p} />
        ))}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Layer 1 — decorative disc orb (right)                              */}
      {/* ------------------------------------------------------------------ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <DiscOrb />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Layer 2 — main hero content                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 flex flex-col items-center text-center">

        {/* Pre-header badge */}
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2 mb-8"
        >
          <Zap
            size={12}
            className="text-spark"
            style={{ filter: 'drop-shadow(0 0 4px rgba(255,107,0,0.8))' }}
          />
          <span
            className="font-display text-sm tracking-[0.3em] text-spark"
            style={{ letterSpacing: '0.3em' }}
          >
            SPARKED DISC GOLF
          </span>
          <Zap
            size={12}
            className="text-spark"
            style={{ filter: 'drop-shadow(0 0 4px rgba(255,107,0,0.8))' }}
          />
        </motion.div>

        {/* Headline — staggered word reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          {/* Line 1: IGNITE YOUR */}
          <div className="flex flex-wrap justify-center gap-x-[0.25em] leading-none mb-1">
            <motion.span
              variants={wordVariants}
              className="font-display font-bold text-7xl md:text-8xl lg:text-9xl text-spark-gradient"
            >
              IGNITE
            </motion.span>
            <motion.span
              variants={wordVariants}
              className="font-display font-bold text-7xl md:text-8xl lg:text-9xl text-white"
            >
              YOUR
            </motion.span>
          </div>
          {/* Line 2: DISC GOLF GAME */}
          <div className="flex flex-wrap justify-center gap-x-[0.25em] leading-none">
            <motion.span
              variants={wordVariants}
              className="font-display font-bold text-7xl md:text-8xl lg:text-9xl text-white"
            >
              DISC
            </motion.span>
            <motion.span
              variants={wordVariants}
              className="font-display font-bold text-7xl md:text-8xl lg:text-9xl text-white"
            >
              GOLF
            </motion.span>
            <motion.span
              variants={wordVariants}
              className="font-display font-bold text-7xl md:text-8xl lg:text-9xl text-white"
            >
              GAME
            </motion.span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp(0.85)}
          initial="hidden"
          animate="visible"
          className="font-body text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: '#8A8A8A' }}
        >
          Premium video courses designed to transform your game.
          From first throw to tournament ready.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp(1.05)}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Primary CTA */}
          <motion.button
            onClick={handleScrollToCourses}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="pulse-spark font-body font-semibold text-lg text-white rounded-full px-8 py-4 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #FF6B00, #FFB800)',
            }}
          >
            Explore Courses
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            onClick={handleScrollToPreview}
            whileHover={{
              scale: 1.05,
              borderColor: 'rgba(255,107,0,0.7)',
            }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 font-body font-semibold text-lg text-white rounded-full px-8 py-4 cursor-pointer transition-colors duration-300"
            style={{
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'transparent',
            }}
          >
            <span
              className="flex items-center justify-center w-8 h-8 rounded-full"
              style={{ background: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.3)' }}
            >
              <Play size={14} className="text-spark" style={{ marginLeft: 2 }} />
            </span>
            Watch Preview
          </motion.button>
        </motion.div>

        {/* Trust signals row */}
        <motion.div
          variants={fadeUp(1.3)}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-6 mt-12 flex-wrap justify-center"
        >
          {[
            '12,000+ Students',
            '4.9 ★ Rating',
            '30-Day Guarantee',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && (
                <span
                  className="hidden sm:block w-px h-4"
                  style={{ background: 'rgba(255,255,255,0.12)' }}
                  aria-hidden="true"
                />
              )}
              <span className="font-body text-sm" style={{ color: 'rgba(138,138,138,0.8)' }}>
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Layer 2 — scroll indicator                                          */}
      {/* ------------------------------------------------------------------ */}
      <ScrollIndicator />

      {/* ------------------------------------------------------------------ */}
      {/* Bottom vignette fade into the next section                         */}
      {/* ------------------------------------------------------------------ */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(10,10,10,0.8))',
        }}
      />
    </section>
  );
}
