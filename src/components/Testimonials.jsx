import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '../data/courses';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
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

function StarRating({ count = 5 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className="text-ember fill-ember"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      className="py-24 px-4 relative overflow-hidden"
      style={{ background: 'rgba(17,17,17,0.3)' }}
    >
      {/* Decorative background accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 80% 50%, rgba(255,184,0,0.04) 0%, transparent 55%), ' +
            'radial-gradient(ellipse at 20% 80%, rgba(255,107,0,0.05) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative">

        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="font-body text-xs font-semibold tracking-[0.25em] text-spark uppercase mb-3">
            Student Results
          </p>
          <h2 className="font-display text-5xl sm:text-6xl tracking-wide leading-none">
            <span className="text-white">Real Players, Real </span>
            <span className="text-spark-gradient">Results</span>
          </h2>
          <div className="mt-5 h-px w-20 mx-auto bg-gradient-to-r from-spark to-ember rounded-full" />
        </motion.div>

        {/* Testimonial grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
              className="glass-card rounded-2xl p-6 flex flex-col relative group"
            >
              {/* Subtle hover glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.06) 0%, transparent 70%)',
                }}
              />

              {/* Stars */}
              <StarRating count={testimonial.rating} />

              {/* Quote */}
              <p className="font-body text-white/90 italic leading-relaxed mt-4 text-sm flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Improvement badge */}
              <span
                className="mt-4 inline-block font-body text-sm font-semibold text-spark px-3 py-1 rounded-full"
                style={{ background: 'rgba(255,107,0,0.10)' }}
              >
                {testimonial.improvement}
              </span>

              {/* Divider */}
              <div
                className="mt-4"
                style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }}
              />

              {/* Author row */}
              <div className="flex items-center gap-3 mt-4">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-spark to-ember flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <span className="font-body text-sm font-bold text-white leading-none">
                    {testimonial.avatar}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-body text-white font-medium text-sm leading-snug truncate">
                    {testimonial.name}
                  </p>
                  <p className="font-body text-steel text-xs leading-snug truncate">
                    {testimonial.location}
                  </p>
                  <p className="font-body text-spark text-xs leading-snug truncate">
                    {testimonial.course}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
