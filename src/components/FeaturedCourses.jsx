import { motion } from 'framer-motion';
import { courses } from '../data/courses';
import CourseCard from './CourseCard';

const featuredCourses = courses.filter((c) => c.featured);

// Section entrance: container staggers children
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function FeaturedCourses() {
  return (
    <section id="courses" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          {/* Pre-header label */}
          <p className="font-display text-spark text-sm tracking-[0.2em] mb-4">
            FEATURED COURSES
          </p>

          {/* Main title */}
          <h2 className="font-display leading-none">
            <span className="block text-5xl md:text-6xl text-white">
              Courses That
            </span>
            <span className="block text-5xl md:text-6xl mt-1">
              <span className="text-spark-gradient">Transform</span>
              <span className="text-white"> Games</span>
            </span>
          </h2>

          {/* Divider accent */}
          <div className="flex items-center justify-center gap-3 mt-6 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-spark/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-spark" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-spark/60" />
          </div>

          {/* Subtitle */}
          <p className="font-body text-steel text-lg max-w-xl mx-auto leading-relaxed">
            Hand-crafted curricula designed by professional players to unlock your true potential on the course.
          </p>
        </motion.div>

        {/* Course cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredCourses.map((course) => (
            <motion.div key={course.id} variants={cardVariants} className="flex">
              <div className="w-full">
                <CourseCard course={course} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center text-steel text-sm font-body mt-12"
        >
          Scroll down to browse our full catalog of{' '}
          <span className="text-spark font-semibold">{courses.length} courses</span>.
        </motion.p>

      </div>
    </section>
  );
}
