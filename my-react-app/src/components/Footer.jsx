import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  Copy, 
  Check, 
  FileText, 
  ExternalLink,
  Layers,
  Sparkles,
  Database
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Don't show duplicate CTA band on pages that already have their own primary action form
  const hideCtaBand = location.pathname === '/contact' || location.pathname === '/';

  const copyEmail = () => {
    navigator.clipboard.writeText('editorial.io.hq@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const footerColumns = [
    {
      title: 'Platform',
      links: [
        { label: 'Document Generation', to: '/features' },
        { label: 'Context Engine', to: '/features' },
        { label: 'Smart Editor', to: '/features' },
        { label: 'Knowledge Base Graph', to: '/features' },
        { label: 'Multi-Source Citations', to: '/features' },
        { label: 'Audit Trail & Diffs', to: '/features' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Product PRDs', to: '/solutions#individuals' },
        { label: 'Technical Specs', to: '/solutions#individuals' },
        { label: 'Standard Operating Procedures', to: '/solutions#individuals' },
        { label: 'Architecture Decision Records', to: '/solutions#organizations' },
        { label: 'Executive & Research Briefs', to: '/solutions#organizations' },
        { label: 'Organizational Memory', to: '/solutions#organizations' },
      ],
    },
    {
      title: 'Compare & Research',
      links: [
        { label: 'Editorial vs Traditional Docs', to: '/comparison' },
        { label: 'Editorial vs AI Chatbots', to: '/comparison' },
        { label: 'Why Documentation Fails', to: '/problem' },
        { label: 'McKinsey Workplace Data', to: '/problem' },
        { label: 'Feature Comparison Matrix', to: '/comparison' },
        { label: 'Early Access Roadmap', to: '/features' },
      ],
    },
    {
      title: 'Ecosystem & Trust',
      links: [
        { label: 'Model Context Protocol (MCP)', to: '/features' },
        { label: 'Markdown & Git Integration', to: '/features' },
        { label: 'Zero-Training Privacy', to: '/contact' },
        { label: 'Security & Compliance', to: '/contact' },
        { label: 'Request Early Access', to: '/contact' },
        { label: 'Organization Inquiry', to: '/contact#organizations' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Valispring', to: '/solutions' },
        { label: 'Product Lab Notes', to: '/features' },
        { label: 'The Problem Statement', to: '/problem' },
        { label: 'Contact Founder Desk', to: '/contact' },
        { label: 'editorial.io.hq@gmail.com', href: 'mailto:editorial.io.hq@gmail.com' },
      ],
    },
  ];

  return (
    <footer className="relative bg-[#0C0C0E] text-white border-t border-white/[0.08] overflow-hidden">
      
      {/* Optional Top Call-to-Action Band (Only shown on informative sub-pages) */}
      {!hideCtaBand && (
        <div className="relative z-10 border-b border-white/[0.08] bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-8 py-16 sm:py-20">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-blue bg-accent-blue/10 border border-accent-blue/20 mb-4">
                  <Sparkles size={13} />
                  Join the Early Access Preview
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-white mb-4 leading-[1.12]">
                  Documentation deserves a<br />
                  <span className="text-white/50">fundamentally better system.</span>
                </h2>
                <p className="text-white/60 text-base leading-relaxed max-w-xl">
                  Editorial.io connects raw notes, technical specs, and team research into verified, living documentation that stays fresh.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-blue-600/20"
                >
                  Request Early Access
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/contact#organizations"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium border border-white/20 text-white/90 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
                >
                  Talk to Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main TradingView-Style Directory Section */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-8 pt-16 sm:pt-20 pb-12 sm:pb-16">
        
        {/* Top Header Row with Logo, Brand Info & Live System Status */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <Link to="/" className="flex items-center gap-3 group" aria-label="Editorial.io Home">
              <div className="w-9 h-9 rounded-[9px] bg-[#16161A] border border-white/[0.15] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-accent-blue shadow-md">
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                  <path d="M7.5 7.5H14.5V9.2H12V22.8H14.5V24.5H7.5V22.8H10V9.2H7.5V7.5Z" fill="#FAFAF8"/>
                  <path d="M12 7.5H22V10.2H20V9.2H12V7.5Z" fill="#FAFAF8"/>
                  <path d="M12 14.8H19.5V16.8H12V14.8Z" fill="#FAFAF8"/>
                  <path d="M12 22.8H20.5V21.8H22.5V24.5H12V22.8Z" fill="#FAFAF8"/>
                  <circle cx="24" cy="9" r="2.2" fill="#3B82F6"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold tracking-tight text-white leading-none">
                  Editorial<span className="text-[#3B82F6]">.io</span>
                </span>
                <span className="text-[11px] text-white/40 tracking-wider uppercase mt-1">
                  by Valispring
                </span>
              </div>
            </Link>

            <div className="h-6 w-[1px] bg-white/[0.1] hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs text-white/60 font-medium">
                Early Access v0.9 · All Systems Operational
              </span>
            </div>
          </div>

          {/* Quick Contact & Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-xs font-mono text-white/70 hover:text-white transition-all cursor-pointer"
              title="Click to copy email address"
            >
              {copiedEmail ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copiedEmail ? 'Copied to clipboard' : 'editorial.io.hq@gmail.com'}</span>
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-medium text-white transition-all shadow-sm"
            >
              Request Access <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* 5-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 py-12 sm:py-16">
          {footerColumns.map((col) => (
            <div key={col.title} className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-xs sm:text-[13px] text-white/60 hover:text-white transition-colors duration-200 block py-0.5"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target={link.href?.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="text-xs sm:text-[13px] text-white/60 hover:text-white transition-colors duration-200 block py-0.5"
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

        {/* Ecosystem / Workflow Features Strip (TradingView Market Ticker Aesthetic) */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50">
              <Layers size={14} className="text-[#3B82F6]" />
              <span>Core Architectural Tenets</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/70">
                Context-First Intelligence
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/70">
                Zero-Hallucination Grounding
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/70">
                Native Document Hierarchy
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/70">
                Full Provenance Audit Trail
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/70">
                Model Context Protocol (MCP) Ready
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Transparency & Operating Disclosure (TradingView Style Disclaimer) */}
        <div className="text-xs text-white/40 leading-relaxed space-y-2 pt-2 pb-8 border-b border-white/[0.08]">
          <p>
            <strong>Operating Transparency:</strong> Editorial.io by Valispring is an AI-native documentation and organizational knowledge workspace currently in controlled private preview. Capabilities described as MVP are actively functioning in partner testing; roadmap items are undergoing active development.
          </p>
          <p>
            <strong>Privacy & Data Sovereignty:</strong> Customer documents, contextual inputs, and institutional repositories are processed in isolated workspaces and are never shared or utilized to train general foundation models. Direct inquiries may be directed to <a href="mailto:editorial.io.hq@gmail.com" className="text-white/60 hover:text-white underline">editorial.io.hq@gmail.com</a>.
          </p>
        </div>

        {/* Final Bottom Bar: Copyright, Legal Links, Language & Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8">
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/40 text-center md:text-left">
            <span>© {currentYear} Editorial.io by Valispring. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="hidden sm:inline">•</span>
            <Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="hidden sm:inline">•</span>
            <Link to="/contact" className="hover:text-white transition-colors">Security Disclosures</Link>
          </div>

          <div className="flex items-center gap-5">
            {/* Language / Region pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs text-white/60">
              <Globe size={13} />
              <span>English (US)</span>
            </div>

            {/* Social & Code links */}
            <div className="flex items-center gap-2.5 text-white/50">
              <a
                href="https://github.com/techmuskan/editorial"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-white hover:bg-white/[0.05] rounded-md transition-colors"
                aria-label="GitHub Repository"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a
                href="mailto:editorial.io.hq@gmail.com"
                className="p-1.5 hover:text-white hover:bg-white/[0.05] rounded-md transition-colors"
                aria-label="X / Twitter"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="mailto:editorial.io.hq@gmail.com"
                className="p-1.5 hover:text-white hover:bg-white/[0.05] rounded-md transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
