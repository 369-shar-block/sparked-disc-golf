import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { courses } from '../data/courses';
import CourseCard from './CourseCard';

const FILTERS = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: -10,
    transition: { duration: 0.22, ease: 'easeIn' },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function CourseCatalog() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredCourses =
    activeFilter === 'All'
      ? courses
      : courses.filter((c) => c.level === activeFilter);

  return (
    <section className="py-24 px-4 bg-charcoal/50">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-12"
        >
          <p className="font-display text-spark text-sm tracking-[0.2em] mb-4">
            ALL COURSES
          </p>

          <h2 className="font-display leading-none">
            <span className="block text-5xl md:text-6xl text-white">
              Browse Our Full
            </span>
            <span className="block text-5xl md:text-6xl mt-1 text-spark-gradient">
              Catalog
            </span>
          </h2>

          {/* Divider accent */}
          <div className="flex items-center justify-center gap-3 mt-6 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-spark/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-spark" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-spark/60" />
          </div>

          <p className="font-body text-steel text-lg max-w-xl mx-auto leading-relaxed">
            Every course built to move the needle. Pick your level and start throwing better today.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
          role="tablist"
          aria-label="Filter courses by level"
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <motion.button
                key={filter}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter)}
                whileTap={{ scale: 0.95 }}
                className={`
                  font-body font-semibold text-sm px-6 py-2 rounded-full
                  cursor-pointer transition-all duration-200
                  ${
                    isActive
                      ? 'bg-spark text-white shadow-[0_0_20px_rgba(255,107,0,0.35)]'
                      : 'bg-ash/50 text-steel hover:text-white hover:bg-ash border border-white/5'
                  }
                `}
              >
                {filter}
                {/* Course count badge */}
                <span
                  className={`
                    ml-2 text-xs px-1.5 py-0.5 rounded-full font-normal
                    ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-steel/60'}
                  `}
                >
                  {filter === 'All'
                    ? courses.length
                    : courses.filter((c) => c.level === filter).length}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Course grid with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          {filteredCourses.length > 0 ? (
            <motion.div
              key={activeFilter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={cardVariants}
                  layout
                  className="flex"
                >
                  <div className="w-full">
                    <CourseCard course={course} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Empty state
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-ash/60 flex items-center justify-center mb-6 border border-white/5">
                <Search size={24} className="text-steel" />
              </div>
              <h3 className="font-display text-3xl text-white mb-2">No courses found</h3>
              <p className="font-body text-steel text-base max-w-sm">
                No courses match the{' '}
                <span className="text-spark font-semibold">{activeFilter}</span> filter yet.
                Check back soon or browse all courses.
              </p>
              <button
                onClick={() => setActiveFilter('All')}
                className="mt-6 font-body font-semibold text-sm text-white px-6 py-2.5 rounded-full bg-gradient-to-r from-spark to-ember hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
              >
                View All Courses
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results summary */}
        {filteredCourses.length > 0 && (
          <motion.p
            key={`summary-${activeFilter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-center text-steel/60 text-sm font-body mt-10"
          >
            Showing{' '}
            <span className="text-steel font-semibold">{filteredCourses.length}</span>{' '}
            {filteredCourses.length === 1 ? 'course' : 'courses'}
            {activeFilter !== 'All' && (
              <> for <span className="text-spark font-semibold">{activeFilter}</span> level</>
            )}
          </motion.p>
        )}

      </div>
    </section>
  );
}
