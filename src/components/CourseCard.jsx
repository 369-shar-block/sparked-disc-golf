import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Users, Star, ArrowRight } from 'lucide-react';

// Gradient configs keyed to course.image value
const IMAGE_GRADIENTS = {
  fundamentals: {
    from: '#FF6B00',
    mid: '#FF8C00',
    to: '#FFB800',
    style: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 50%, #FFB800 100%)',
    ring: 'rgba(255, 184, 0, 0.15)',
  },
  distance: {
    from: '#C0392B',
    mid: '#E74C3C',
    to: '#FF6B00',
    style: 'linear-gradient(135deg, #8B0000 0%, #C0392B 40%, #FF6B00 100%)',
    ring: 'rgba(192, 57, 43, 0.2)',
  },
  strategy: {
    from: '#FFB800',
    mid: '#8BC34A',
    to: '#2E7D32',
    style: 'linear-gradient(135deg, #FFB800 0%, #8BC34A 55%, #2E7D32 100%)',
    ring: 'rgba(139, 195, 74, 0.15)',
  },
  advanced: {
    from: '#6A0DAD',
    mid: '#9B30D0',
    to: '#FF6B00',
    style: 'linear-gradient(135deg, #3D0066 0%, #7B1FA2 45%, #FF6B00 100%)',
    ring: 'rgba(123, 31, 162, 0.2)',
  },
  putting: {
    from: '#0D47A1',
    mid: '#1976D2',
    to: '#FF6B00',
    style: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 40%, #FF6B00 100%)',
    ring: 'rgba(21, 101, 192, 0.2)',
  },
  forehand: {
    from: '#FF6B00',
    mid: '#E53935',
    to: '#8B0000',
    style: 'linear-gradient(135deg, #FF6B00 0%, #E53935 50%, #8B0000 100%)',
    ring: 'rgba(229, 57, 53, 0.2)',
  },
};

const FALLBACK_GRADIENT = {
  style: 'linear-gradient(135deg, #FF6B00 0%, #FFB800 100%)',
  ring: 'rgba(255, 107, 0, 0.15)',
};

const LEVEL_STYLES = {
  Beginner: 'bg-green-500/20 text-green-400 border border-green-500/30',
  Intermediate: 'bg-spark/20 text-spark border border-spark/30',
  Advanced: 'bg-red-500/20 text-red-400 border border-red-500/30',
  'All Levels': 'bg-ember/20 text-ember border border-ember/30',
};

export default function CourseCard({ course }) {
  const gradient = IMAGE_GRADIENTS[course.image] ?? FALLBACK_GRADIENT;
  const levelStyle = LEVEL_STYLES[course.level] ?? LEVEL_STYLES['All Levels'];

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,107,0,0.12)' }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="h-full"
    >
      <Link
        to={`/course/${course.id}`}
        className="glass-card rounded-2xl overflow-hidden group cursor-pointer flex flex-col h-full block"
        aria-label={`View ${course.title} course`}
      >
        {/* ── Image area ── */}
        <div className="h-48 relative overflow-hidden shrink-0">
          {/* Animated gradient background */}
          <div
            className="absolute inset-0 group-hover:scale-110 transition-transform duration-500"
            style={{ background: gradient.style }}
          />

          {/* Noise texture overlay for depth */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'300\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'300\' height=\'300\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
              backgroundSize: '300px 300px',
            }}
          />

          {/* Large decorative disc rings */}
          <div
            className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full border-2 border-white/10"
            style={{ boxShadow: `0 0 40px ${gradient.ring}` }}
          />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border border-white/15" />
          <div className="absolute -bottom-1 -right-1 w-12 h-12 rounded-full border border-white/20" />

          {/* Center radial highlight */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.18) 0%, transparent 60%)',
            }}
          />

          {/* Disc icon SVG */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 120 120"
              className="w-28 h-28 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              aria-hidden="true"
            >
              {/* Outer rim */}
              <ellipse cx="60" cy="64" rx="52" ry="20" fill="white" />
              {/* Flight plate dome */}
              <ellipse cx="60" cy="52" rx="38" ry="22" fill="white" opacity="0.9" />
              {/* Center dome */}
              <ellipse cx="60" cy="48" rx="18" ry="11" fill="white" opacity="0.7" />
              {/* Rim lines */}
              <ellipse cx="60" cy="66" rx="52" ry="8" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
              <ellipse cx="60" cy="64" rx="40" ry="6" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>

          {/* Shimmer sweep on hover */}
          <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Level badge */}
          <span
            className={`absolute top-3 left-3 text-xs font-semibold font-body px-2.5 py-1 rounded-full backdrop-blur-sm ${levelStyle}`}
          >
            {course.level}
          </span>

          {/* Featured badge */}
          {course.featured && (
            <span className="absolute top-3 right-3 text-xs font-bold font-body px-2.5 py-1 rounded-full bg-ember text-coal tracking-wide">
              FEATURED
            </span>
          )}
        </div>

        {/* ── Content area ── */}
        <div className="p-6 flex flex-col flex-1">
          {/* Title & subtitle */}
          <h3 className="text-lg font-bold font-body text-white leading-snug line-clamp-1">
            {course.title}
          </h3>
          <p className="text-sm text-steel mt-1 font-body">{course.subtitle}</p>

          {/* Description */}
          <p className="text-sm text-steel/80 mt-3 font-body leading-relaxed line-clamp-2">
            {course.description}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 mt-4 text-xs text-steel font-body">
            <span className="flex items-center gap-1.5 shrink-0">
              <Clock size={13} className="text-steel/70" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1.5 shrink-0">
              <BookOpen size={13} className="text-steel/70" />
              {course.modules} modules
            </span>
            <span className="flex items-center gap-1.5 shrink-0">
              <Users size={13} className="text-steel/70" />
              {course.students.toLocaleString()}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-3 font-body">
            <Star size={14} className="text-ember fill-ember shrink-0" />
            <span className="text-sm font-semibold text-white">{course.rating}</span>
            <span className="text-xs text-steel">({course.reviews} reviews)</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs font-body px-2 py-0.5 rounded-full bg-ash/60 text-steel/80 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price row */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5 mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-body text-white">${course.price}</span>
              <span className="text-sm text-steel line-through font-body">${course.originalPrice}</span>
            </div>
            <span className="flex items-center gap-1 text-spark text-sm font-semibold font-body opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Course
              <ArrowRight size={15} className="translate-x-0 group-hover:translate-x-0.5 transition-transform duration-300" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
