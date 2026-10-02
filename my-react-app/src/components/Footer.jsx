import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  // Don't show redundant CTA band on pages that already contain a full CTA form
  const hideCtaBand = location.pathname === '/contact' || location.pathname === '/';

  const navGroups = [
    {
      title: 'Product',
      links: [
        { label: 'Features', to: '/features' },
        { label: 'Solutions', to: '/solutions' },
        { label: 'Comparison', to: '/comparison' },
        { label: 'The Problem', to: '/problem' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'For Individuals', to: '/solutions#individuals' },
        { label: 'For Organizations', to: '/solutions#organizations' },
        { label: 'Early Access', to: '/contact' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Valispring', href: '#' },
        { label: 'Contact', to: '/contact' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
      ],
    },
  ];

  return (
    <footer className="relative bg-dark-mesh text-white overflow-hidden noise-overlay">
      {/* Top CTA band (only shown on informative pages, not duplicate on home/contact) */}
      {!hideCtaBand && (
        <div className="relative z-10 border-b border-white/[0.06]">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-xl">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-4">
                  Join the Early Access
                </p>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.15] mb-4">
                  Documentation deserves a<br />
                  <span className="text-white/50">fundamentally better approach.</span>
                </h2>
                <p className="text-white/50 text-base leading-relaxed">
                  Editorial.io is building the AI-native workspace for creating, managing, and preserving documentation that matters.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:pb-1">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-medium bg-white text-midnight rounded-full hover:bg-white/90 transition-all duration-300 active:scale-[0.97] shadow-lg shadow-white/10 glow-ring"
                >
                  Request Early Access
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/contact#organizations"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-medium border border-white/15 text-white/80 rounded-full hover:bg-white/5 hover:text-white hover:border-white/25 transition-all duration-300"
                >
                  Talk to Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main footer */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-8 h-8 rounded-[8px] bg-white/10 border border-white/[0.12] flex items-center justify-center transition-all duration-300 group-hover:bg-white/15 group-hover:scale-105">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                  <path d="M7.5 7.5H14.5V9.2H12V22.8H14.5V24.5H7.5V22.8H10V9.2H7.5V7.5Z" fill="#FAFAF8"/>
                  <path d="M12 7.5H22V10.2H20V9.2H12V7.5Z" fill="#FAFAF8"/>
                  <path d="M12 14.8H19.5V16.8H12V14.8Z" fill="#FAFAF8"/>
                  <path d="M12 22.8H20.5V21.8H22.5V24.5H12V22.8Z" fill="#FAFAF8"/>
                  <circle cx="24" cy="9" r="2.2" fill="#3B82F6"/>
                </svg>
              </div>
              <span className="text-[16px] font-semibold tracking-tight text-white font-serif">
                Editorial<span className="text-accent-blue font-sans text-sm">.io</span>
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-[200px]">
              AI-native documentation workspace for individuals and organizations.
            </p>
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
              <span className="text-xs text-white/30">Building something new</span>
            </div>
            <a
              href="mailto:editorial.io.hq@gmail.com"
              className="text-xs text-white/35 hover:text-white/60 transition-colors break-all"
            >
              editorial.io.hq@gmail.com
            </a>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-4">
                {group.title}
              </p>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25 text-center sm:text-left">
              © {currentYear} Editorial.io — A{' '}
              <a href="#" className="text-white/40 hover:text-white/60 transition-colors font-medium">
                Valispring
              </a>{' '}
              product. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">Privacy</a>
              <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">Terms</a>
              <a href="mailto:editorial.io.hq@gmail.com" className="text-xs text-white/25 hover:text-white/50 transition-colors">editorial.io.hq@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent-blue/15 to-transparent" aria-hidden="true" />
    </footer>
  );
}
