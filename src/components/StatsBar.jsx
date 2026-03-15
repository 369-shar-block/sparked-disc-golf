import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '../data/courses';

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

/** Container staggers children in as the bar scrolls into view */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

/** Each stat card fades up individually */
const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// StatItem
// ---------------------------------------------------------------------------

function StatItem({ value, label }) {
  return (
    <motion.div
      variants={statVariants}
      className="flex flex-col items-center gap-1 px-4 py-2"
    >
      {/* Value */}
      <span className="font-display text-4xl leading-none text-spark-gradient">
        {value}
      </span>

      {/* Label */}
      <span
        className="font-body text-sm uppercase tracking-wider"
        style={{ color: '#8A8A8A', letterSpacing: '0.12em' }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Vertical divider between stats (desktop only)
// ---------------------------------------------------------------------------
function Divider() {
  return (
    <div
      aria-hidden="true"
      className="hidden md:block h-12 w-px shrink-0"
      style={{ background: 'rgba(255,255,255,0.08)' }}
    />
  );
}

// ---------------------------------------------------------------------------
// StatsBar
// ---------------------------------------------------------------------------
export default function StatsBar() {
  const ref = useRef(null);

  // Trigger animation when at least 30% of the bar is visible
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="stats"
      ref={ref}
      aria-label="Key statistics"
      className="w-full border-y"
      style={{
        background: 'rgba(26,26,26,0.5)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderColor: 'rgba(255,255,255,0.05)',
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="
          max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
          py-8
          grid grid-cols-2 md:flex md:flex-row md:justify-around md:items-center
          gap-y-6 md:gap-y-0
        "
      >
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex items-center justify-center md:flex-1">
            {/* Divider before every item except the first (desktop only) */}
            {index > 0 && <Divider />}

            <div className="flex-1 flex justify-center">
              <StatItem value={stat.value} label={stat.label} />
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
