import { Link } from 'react-router-dom';

const COURSE_LINKS = [
  { label: 'Fundamentals Ignited', href: '#courses' },
  { label: 'The Distance Lab', href: '#courses' },
  { label: 'Course Crusher', href: '#courses' },
  { label: 'Pro Circuit Prep', href: '#courses' },
  { label: 'Putt Like Fire', href: '#courses' },
  { label: 'The Forehand Formula', href: '#courses' },
];

const COMPANY_LINKS = [
  { label: 'About', href: '#' },
  { label: 'Instructors', href: '#instructors' },
  { label: 'Blog', href: '#' },
  { label: 'Careers', href: '#' },
];

const SUPPORT_LINKS = [
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#' },
  { label: 'Refund Policy', href: '#' },
  { label: 'Terms', href: '#' },
];

const BOTTOM_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

// Placeholder social icon component using a circle with an initial letter
function SocialLink({ label, initial }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-steel hover:text-spark hover:border-spark/50 transition-all duration-200 hover:scale-110"
    >
      <span className="font-display text-sm leading-none">{initial}</span>
    </a>
  );
}

function FooterColumn({ heading, links }) {
  return (
    <div>
      <h3 className="font-display text-lg tracking-widest text-white mb-4">
        {heading}
      </h3>
      <ul className="space-y-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="font-body text-sm text-steel hover:text-spark transition-colors duration-200"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DiscLogo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="discGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#FFB800" />
        </linearGradient>
      </defs>
      <ellipse cx="16" cy="17" rx="14" ry="5.5" fill="url(#discGradientFooter)" />
      <ellipse cx="16" cy="14" rx="10" ry="6" fill="url(#discGradientFooter)" opacity="0.9" />
      <ellipse cx="16" cy="13" rx="5" ry="3" fill="#FFB800" opacity="0.6" />
      <ellipse cx="16" cy="17.5" rx="14" ry="2" fill="#FF6B00" opacity="0.3" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-coal border-t border-white/5 relative">
      {/* Spark accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-spark to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 group mb-4">
              <div className="transition-transform duration-200 group-hover:scale-110">
                <DiscLogo />
              </div>
              <span className="font-display text-2xl tracking-widest text-spark-gradient leading-none">
                SPARKED
              </span>
            </Link>

            <p className="font-body text-sm text-steel leading-relaxed mb-6 max-w-xs">
              Ignite your disc golf game. Premium online instruction from PDGA-rated pros who have coached thousands of players to personal bests.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <SocialLink label="Instagram" initial="IG" />
              <SocialLink label="YouTube" initial="YT" />
              <SocialLink label="Facebook" initial="FB" />
              <SocialLink label="TikTok" initial="TK" />
              <SocialLink label="X (Twitter)" initial="X" />
            </div>
          </div>

          {/* Column 2: Courses */}
          <FooterColumn heading="Courses" links={COURSE_LINKS} />

          {/* Column 3: Company */}
          <FooterColumn heading="Company" links={COMPANY_LINKS} />

          {/* Column 4: Support */}
          <FooterColumn heading="Support" links={SUPPORT_LINKS} />
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-steel">
              &copy; 2025 Sparked Disc Golf LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {BOTTOM_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="font-body text-xs text-steel hover:text-spark transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
