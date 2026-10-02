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
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0 group" aria-label="Editorial.io Home">
              <div className="w-7 h-7 rounded-lg bg-ink flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3h10v1.5H3zm0 3.5h7v1.5H3zm0 3.5h8v1.5H3zm0 3.5h5v1.5H3z" fill="#FAFAF8" opacity="0.9"/>
                </svg>
              </div>
              <span className="text-[15px] font-semibold tracking-tight text-foreground">
                Editorial<span className="text-muted">.io</span>
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
