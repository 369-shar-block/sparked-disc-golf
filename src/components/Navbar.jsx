import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Courses', sectionId: 'courses' },
  { label: 'Instructors', sectionId: 'instructors' },
  { label: 'Pricing', sectionId: 'pricing' },
  { label: 'FAQ', sectionId: 'faq' },
];

function DiscLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="discGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#FFB800" />
        </linearGradient>
      </defs>
      {/* Outer disc body */}
      <ellipse cx="16" cy="17" rx="14" ry="5.5" fill="url(#discGradient)" />
      {/* Disc dome */}
      <ellipse cx="16" cy="14" rx="10" ry="6" fill="url(#discGradient)" opacity="0.9" />
      {/* Center flight plate highlight */}
      <ellipse cx="16" cy="13" rx="5" ry="3" fill="#FFB800" opacity="0.6" />
      {/* Rim edge shadow */}
      <ellipse cx="16" cy="17.5" rx="14" ry="2" fill="#FF6B00" opacity="0.3" />
    </svg>
  );
}

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  function handleNavClick(sectionId) {
    setMobileOpen(false);
    // Small delay on mobile to let menu close before scrolling
    setTimeout(() => scrollToSection(sectionId), mobileOpen ? 300 : 0);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 ${
          scrolled
            ? 'bg-coal/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-coal/80 backdrop-blur-xl'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group shrink-0"
              onClick={() => setMobileOpen(false)}
            >
              <div className="transition-transform duration-200 group-hover:scale-110">
                <DiscLogo />
              </div>
              <span className="font-display text-2xl tracking-widest text-spark-gradient leading-none">
                SPARKED
              </span>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map(({ label, sectionId }) => (
                <button
                  key={sectionId}
                  onClick={() => scrollToSection(sectionId)}
                  className="font-body text-sm font-medium text-steel hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => scrollToSection('courses')}
                className="font-body font-semibold text-sm text-white px-5 py-2.5 rounded-full bg-gradient-to-r from-spark to-ember transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                Start Learning
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden p-2 text-steel hover:text-white transition-colors duration-200 cursor-pointer"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-coal/98 backdrop-blur-xl flex flex-col pt-20 px-6 pb-10 md:hidden"
          >
            {/* Decorative accent */}
            <div className="absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-spark to-transparent opacity-60" />

            <nav className="flex flex-col gap-1 mt-8" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ label, sectionId }, index) => (
                <motion.button
                  key={sectionId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07, duration: 0.25 }}
                  onClick={() => handleNavClick(sectionId)}
                  className="font-display text-4xl tracking-widest text-left text-white/80 hover:text-spark-gradient py-3 transition-colors duration-200 cursor-pointer border-b border-white/5"
                >
                  {label}
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.25 }}
              className="mt-auto"
            >
              <button
                onClick={() => handleNavClick('courses')}
                className="w-full font-body font-semibold text-base text-white py-4 rounded-full bg-gradient-to-r from-spark to-ember transition-transform duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer spark-glow"
              >
                Start Learning
              </button>
              <p className="text-center text-steel text-xs mt-4 font-body">
                30-day money-back guarantee
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
