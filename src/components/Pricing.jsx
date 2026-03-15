import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const SINGLE_FEATURES = [
  'Lifetime Access',
  'All Course Modules',
  'Practice Drills',
  'Mobile Friendly',
  '30-Day Guarantee',
];

const ALL_ACCESS_FEATURES = [
  'All 6 Courses Included',
  'Future Courses Free',
  'Lifetime Access',
  'All Course Modules',
  'Practice Drills',
  'Mobile Friendly',
  'Priority Support',
  'Community Access',
  '30-Day Guarantee',
];

const TEAM_FEATURES = [
  'All 6 Courses Included',
  'Future Courses Free',
  'Team Dashboard',
  'Bulk Discount',
  'Custom Training Plan',
  'Priority Support',
  'Lifetime Access',
  '30-Day Guarantee',
];

function FeatureItem({ text, highlighted = false }) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
          highlighted
            ? 'bg-gradient-to-br from-spark to-ember'
            : 'bg-ash'
        }`}
      >
        <Check
          size={11}
          strokeWidth={3}
          className={highlighted ? 'text-white' : 'text-spark'}
          aria-hidden="true"
        />
      </span>
      <span className="font-body text-sm text-steel">{text}</span>
    </li>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 relative overflow-hidden">
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(255,107,0,0.07) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative">

        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="font-body text-xs font-semibold tracking-[0.25em] text-spark uppercase mb-3">
            Pricing
          </p>
          <h2 className="font-display text-5xl sm:text-6xl tracking-wide text-white leading-none">
            Invest In Your Game
          </h2>
          <p className="font-body text-steel mt-5 max-w-md mx-auto text-sm leading-relaxed">
            Choose a single course or unlock everything with the All&#8209;Access Pass.
          </p>
          <div className="mt-5 h-px w-20 mx-auto bg-gradient-to-r from-spark to-ember rounded-full" />
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >

          {/* --- Single Course --- */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.22 } }}
            className="glass-card rounded-2xl p-8 relative group"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.05) 0%, transparent 70%)',
              }}
            />

            <h3 className="font-body text-xl font-bold text-white">
              Single Course
            </h3>

            <div className="mt-6">
              <span className="font-display text-4xl tracking-wide text-spark-gradient leading-none">
                $39&ndash;129
              </span>
              <p className="font-body text-steel text-sm mt-1">per course</p>
            </div>

            <ul className="mt-8 space-y-3">
              {SINGLE_FEATURES.map((feature) => (
                <FeatureItem key={feature} text={feature} />
              ))}
            </ul>

            <button
              className="mt-8 w-full py-3 rounded-full font-body font-semibold text-sm text-spark border border-spark hover:bg-spark hover:text-white transition-all duration-200 cursor-pointer"
              aria-label="Browse individual courses"
            >
              Browse Courses
            </button>
          </motion.div>

          {/* --- All-Access Pass (HIGHLIGHTED) --- */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.22 } }}
            className="glass-card gradient-border spark-glow-strong rounded-2xl p-8 relative group flex flex-col pt-14"
          >
            {/* Most Popular badge — sits above the card */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-spark to-ember text-white text-xs font-bold font-body px-4 py-1 rounded-full whitespace-nowrap shadow-lg">
                MOST POPULAR
              </span>
            </div>

            {/* Animated inner glow on hover */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 10%, rgba(255,107,0,0.12) 0%, transparent 70%)',
              }}
            />

            <h3 className="font-body text-xl font-bold text-white">
              All-Access Pass
            </h3>

            <div className="mt-6">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl tracking-wide text-spark-gradient leading-none">
                  $199
                </span>
                <span className="font-body text-steel text-base line-through">
                  $499
                </span>
              </div>
              <p className="font-body text-steel text-sm mt-1">one-time payment</p>
            </div>

            <ul className="mt-8 space-y-3 flex-1">
              {ALL_ACCESS_FEATURES.map((feature) => (
                <FeatureItem key={feature} text={feature} highlighted />
              ))}
            </ul>

            <button
              className="mt-8 w-full py-4 rounded-full font-body font-bold text-sm text-white bg-gradient-to-r from-spark to-ember pulse-spark cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95"
              aria-label="Get All-Access Pass for $199"
            >
              Get All Access
            </button>
          </motion.div>

          {/* --- Team Package --- */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.22 } }}
            className="glass-card rounded-2xl p-8 relative group"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(255,184,0,0.04) 0%, transparent 70%)',
              }}
            />

            <h3 className="font-body text-xl font-bold text-white">
              Team Package
            </h3>

            <div className="mt-6">
              <span className="font-display text-4xl tracking-wide text-spark-gradient leading-none">
                $149
              </span>
              <p className="font-body text-steel text-sm mt-1">
                per person &middot; min 5 people
              </p>
            </div>

            <ul className="mt-8 space-y-3">
              {TEAM_FEATURES.map((feature) => (
                <FeatureItem key={feature} text={feature} />
              ))}
            </ul>

            <button
              className="mt-8 w-full py-3 rounded-full font-body font-semibold text-sm text-spark border border-spark hover:bg-spark hover:text-white transition-all duration-200 cursor-pointer"
              aria-label="Contact us about the Team Package"
            >
              Contact Us
            </button>
          </motion.div>

        </motion.div>

        {/* Guarantee note */}
        <motion.p
          className="text-center font-body text-steel text-xs mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          All plans include a 30-day money-back guarantee. No risk, no questions asked.
        </motion.p>
      </div>
    </section>
  );
}
