import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useScrollY } from '../hooks';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollY();
  const location = useLocation();
  const scrolled = scrollY > 20;

  useEffect(() => { setMobileOpen(false); }, [location]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const links = [
    { to: '/solutions', label: 'Solutions' },
    { to: '/problem', label: 'The Problem' },
    { to: '/features', label: 'Features' },
    { to: '/comparison', label: 'Comparison' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'py-2'
            : 'py-4'
        }`}
      >
        <div className="mx-auto px-4 sm:px-8 max-w-[1240px]">
          <nav
            className={`flex items-center justify-between rounded-2xl transition-all duration-500 ease-out px-4 sm:px-6 h-14 ${
              scrolled
                ? 'glass border border-white/20 shadow-lg shadow-black/[0.03]'
                : 'bg-transparent'
            }`}
          >
            {/* Exclusive Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="Editorial.io Home">
              <div className="w-8 h-8 rounded-[8px] bg-[#111113] border border-black/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-accent-blue/40 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                  <path d="M7.5 7.5H14.5V9.2H12V22.8H14.5V24.5H7.5V22.8H10V9.2H7.5V7.5Z" fill="#FAFAF8"/>
                  <path d="M12 7.5H22V10.2H20V9.2H12V7.5Z" fill="#FAFAF8"/>
                  <path d="M12 14.8H19.5V16.8H12V14.8Z" fill="#FAFAF8"/>
                  <path d="M12 22.8H20.5V21.8H22.5V24.5H12V22.8Z" fill="#FAFAF8"/>
                  <circle cx="24" cy="9" r="2.2" fill="#2563EB"/>
                </svg>
              </div>
              <span className="text-[16px] font-semibold tracking-tight text-foreground">
                Editorial<span className="text-accent-blue font-medium">.io</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                    isActive(l.to)
                      ? 'text-foreground bg-surface-elevated'
                      : 'text-ink-tertiary hover:text-foreground hover:bg-surface-elevated/60'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-[13px] font-medium bg-ink text-white rounded-full hover:bg-graphite transition-all duration-300 active:scale-[0.97] shadow-sm hover:shadow-md"
              >
                Get Early Access
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -mr-2 text-ink-secondary hover:text-foreground transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-surface border-l border-border shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <span className="text-sm font-semibold tracking-tight">Navigation</span>
          <button onClick={() => setMobileOpen(false)} className="p-1 text-ink-secondary hover:text-foreground">
            <X size={18} />
          </button>
        </div>
        <div className="p-5 space-y-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                isActive(l.to)
                  ? 'text-foreground bg-surface-elevated'
                  : 'text-ink-secondary hover:text-foreground hover:bg-surface-elevated'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-4">
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 w-full px-5 py-2.5 text-sm font-medium bg-ink text-white rounded-full hover:bg-graphite transition-colors"
            >
              Get Early Access
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
