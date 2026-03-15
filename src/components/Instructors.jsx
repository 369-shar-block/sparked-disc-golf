import { motion } from 'framer-motion';
import { instructors } from '../data/courses';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
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

export default function Instructors() {
  return (
    <section id="instructors" className="py-24 px-4 relative overflow-hidden">
      {/* Subtle background radial accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.06) 0%, transparent 65%)',
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
            Meet Your Coaches
          </p>
          <h2 className="font-display text-5xl sm:text-6xl tracking-wide text-white leading-none">
            Learn From The Best
          </h2>
          <div className="mt-5 h-px w-20 mx-auto bg-gradient-to-r from-spark to-ember rounded-full" />
        </motion.div>

        {/* Instructor cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {instructors.map((instructor) => (
            <motion.div
              key={instructor.name}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="glass-card gradient-border rounded-2xl p-8 relative group"
            >
              {/* Hover glow overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 30% 20%, rgba(255,107,0,0.07) 0%, transparent 70%)',
                }}
              />

              {/* Avatar + name row */}
              <div className="flex items-center gap-5 mb-6">
                <div
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-spark to-ember flex items-center justify-center shrink-0 spark-glow"
                  aria-hidden="true"
                >
                  <span className="font-display text-3xl text-white leading-none tracking-wide">
                    {instructor.avatar}
                  </span>
                </div>

                <div>
                  <h3 className="font-body text-2xl font-bold text-white leading-tight">
                    {instructor.name}
                  </h3>
                  <p className="text-spark text-sm font-medium mt-1 font-body">
                    {instructor.title}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="font-body text-steel leading-relaxed mt-4">
                {instructor.bio}
              </p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2 mt-6">
                {instructor.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="bg-ash text-steel text-xs px-3 py-1 rounded-full font-body border border-white/5"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
