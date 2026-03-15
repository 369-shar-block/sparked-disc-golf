import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Clock,
  LayoutGrid,
  Users,
  Star,
  CheckCircle2,
  Infinity,
  Award,
  Smartphone,
  ShieldCheck,
  Zap,
  ChevronRight,
} from 'lucide-react'
import { courses, instructors } from '../data/courses'

// ─── Animation variants ────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
}

// ─── Level badge colour map ────────────────────────────────────────────────

const levelStyles = {
  Beginner:     'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  Intermediate: 'bg-amber-500/15  text-amber-400  border border-amber-500/30',
  Advanced:     'bg-spark/15      text-spark       border border-spark/30',
  'All Levels': 'bg-sky-500/15   text-sky-400     border border-sky-500/30',
}

// ─── Static feature bullets for the purchase card ─────────────────────────

const purchaseFeatures = [
  { icon: Infinity,    label: 'Lifetime Access — watch anytime, anywhere' },
  { icon: Award,       label: 'Certificate of Completion' },
  { icon: Smartphone,  label: 'Mobile & offline access' },
  { icon: ShieldCheck, label: '30-Day money-back guarantee' },
]

// ─── Stat pill ────────────────────────────────────────────────────────────

function StatPill({ icon: Icon, value, label }) {
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-4">
      <Icon className="w-5 h-5 text-spark mb-1" />
      <span className="font-display text-2xl text-white tracking-wide">{value}</span>
      <span className="text-xs text-steel uppercase tracking-widest">{label}</span>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────

export default function CourseDetailPage() {
  const { id } = useParams()
  const course = courses.find((c) => String(c.id) === String(id))

  // ── 404 state ────────────────────────────────────────────────────────────
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-coal text-center px-6">
        <Zap className="w-16 h-16 text-spark opacity-40" />
        <h1 className="font-display text-6xl text-white tracking-wider">404</h1>
        <p className="text-steel text-lg max-w-sm">
          That course doesn't exist — or it got lost in the rough.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-spark text-white font-semibold text-sm tracking-wide hover:bg-spark-light transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    )
  }

  const instructor = instructors.find((ins) => ins.name === course.instructor)
  const discountPct = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-coal min-h-screen"
    >
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* ambient glow layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,107,0,0.18) 0%, transparent 65%), ' +
              'radial-gradient(ellipse 50% 40% at 85% 60%, rgba(255,184,0,0.08) 0%, transparent 50%), ' +
              'linear-gradient(180deg, #111111 0%, #0A0A0A 100%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-16">
          {/* Back link */}
          <motion.div custom={0} variants={fadeUp} initial="initial" animate="animate">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-steel hover:text-spark transition-colors text-sm font-medium mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              All Courses
            </Link>
          </motion.div>

          <div className="max-w-3xl">
            {/* Tags row */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="flex flex-wrap items-center gap-2 mb-5"
            >
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${levelStyles[course.level] ?? ''}`}>
                {course.level}
              </span>
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-steel bg-ash/60 border border-white/5 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Title */}
            <motion.h1
              custom={2}
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="font-display text-6xl md:text-7xl lg:text-8xl text-white leading-none tracking-wide mb-3"
            >
              {course.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={3}
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="text-spark font-display text-2xl tracking-widest uppercase mb-6"
            >
              {course.subtitle}
            </motion.p>

            {/* Rating row */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5"
                    fill={i < Math.round(course.rating) ? '#FFB800' : 'transparent'}
                    stroke="#FFB800"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span className="text-ember font-bold text-lg">{course.rating}</span>
              <span className="text-steel text-sm">({course.reviews.toLocaleString()} reviews)</span>
              <span className="text-steel/40">·</span>
              <Users className="w-4 h-4 text-steel" />
              <span className="text-steel text-sm">{course.students.toLocaleString()} students</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      <motion.div
        custom={5}
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="border-y border-white/5 bg-charcoal"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            <StatPill icon={Clock}      value={course.duration}                 label="Total Duration" />
            <StatPill icon={LayoutGrid} value={`${course.modules} modules`}     label="Video Lessons" />
            <StatPill icon={Users}      value={course.students.toLocaleString()} label="Enrolled" />
            <StatPill icon={Star}       value={course.rating}                   label="Rating" />
          </div>
        </div>
      </motion.div>

      {/* ── Two-column body ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">

          {/* ── Left: description + modules ─────────────────────────────── */}
          <div className="space-y-12">

            {/* Description */}
            <motion.div
              custom={6}
              variants={fadeUp}
              initial="initial"
              animate="animate"
            >
              <h2 className="font-display text-3xl text-white tracking-wide mb-5">
                About This Course
              </h2>
              <p className="text-steel leading-relaxed text-base">
                {course.longDescription}
              </p>
            </motion.div>

            {/* Module list */}
            <motion.div
              custom={7}
              variants={fadeUp}
              initial="initial"
              animate="animate"
            >
              <h2 className="font-display text-3xl text-white tracking-wide mb-6">
                Course Modules
              </h2>
              <div className="space-y-3">
                {course.modules_list.map((mod, i) => (
                  <motion.div
                    key={mod}
                    custom={i}
                    variants={fadeUp}
                    initial="initial"
                    animate="animate"
                    className="group flex items-center gap-4 p-4 rounded-xl bg-charcoal border border-white/5 hover:border-spark/30 hover:bg-smoke transition-all duration-200"
                  >
                    {/* Module number */}
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-ash flex items-center justify-center">
                      <span className="font-display text-spark text-lg leading-none">{i + 1}</span>
                    </div>
                    {/* Module name */}
                    <span className="text-white/80 group-hover:text-white text-sm font-medium transition-colors flex-1">
                      {mod}
                    </span>
                    {/* Hover chevron */}
                    <ChevronRight className="w-4 h-4 text-spark/0 group-hover:text-spark/70 transition-all -translate-x-1 group-hover:translate-x-0 duration-200" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Instructor section */}
            {instructor && (
              <motion.div
                custom={8}
                variants={fadeUp}
                initial="initial"
                animate="animate"
              >
                <h2 className="font-display text-3xl text-white tracking-wide mb-6">
                  Your Instructor
                </h2>
                <div className="glass-card rounded-2xl p-6 flex gap-5 items-start gradient-border">
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-spark to-ember flex items-center justify-center spark-glow">
                    <span className="font-display text-2xl text-white tracking-wider">{instructor.avatar}</span>
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-2xl text-white tracking-wide mb-0.5">
                      {instructor.name}
                    </h3>
                    <p className="text-spark text-sm font-semibold tracking-wide mb-3">
                      {instructor.title}
                    </p>
                    <p className="text-steel text-sm leading-relaxed mb-4">
                      {instructor.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {instructor.specialties.map((s) => (
                        <span
                          key={s}
                          className="text-xs bg-ash/80 text-white/70 border border-white/5 px-3 py-1 rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Right: sticky purchase card ─────────────────────────────── */}
          <div className="lg:sticky lg:top-6">
            <motion.div
              custom={6}
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="rounded-2xl overflow-hidden gradient-border"
              style={{ background: 'linear-gradient(145deg, #1A1A1A 0%, #111111 100%)' }}
            >
              {/* Card top accent bar */}
              <div
                className="h-1 w-full"
                style={{ background: 'linear-gradient(90deg, #FF6B00, #FFB800)' }}
              />

              <div className="p-7 space-y-6">
                {/* Pricing */}
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-display text-5xl text-white tracking-wide">${course.price}</span>
                    <span className="text-steel line-through text-xl">${course.originalPrice}</span>
                    <span className="ml-auto text-xs font-bold bg-spark/15 text-spark border border-spark/30 px-2 py-1 rounded-full">
                      {discountPct}% OFF
                    </span>
                  </div>
                  <p className="text-steel text-xs">One-time purchase. Lifetime access.</p>
                </div>

                {/* CTA */}
                <button
                  className="w-full py-4 rounded-xl font-display text-2xl tracking-widest text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] spark-glow hover:spark-glow-strong"
                  style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #FFB800 100%)' }}
                >
                  ENROLL NOW
                </button>

                {/* Feature bullets */}
                <ul className="space-y-3 pt-2">
                  {purchaseFeatures.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-spark flex-shrink-0 mt-0.5" />
                      <span className="text-steel text-sm leading-snug">{label}</span>
                    </li>
                  ))}
                </ul>

                {/* Guarantee note */}
                <div className="pt-2 border-t border-white/5 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-ember flex-shrink-0" />
                  <p className="text-steel text-xs leading-snug">
                    Not satisfied? Get a full refund within 30 days — no questions asked.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social proof below card */}
            <motion.div
              custom={9}
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="mt-4 flex items-center justify-center gap-2 text-steel text-xs"
            >
              <Users className="w-3.5 h-3.5 text-spark" />
              <span>
                <span className="text-white font-semibold">{course.students.toLocaleString()}</span> students already enrolled
              </span>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
