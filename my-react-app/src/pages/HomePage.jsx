import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  FileText, 
  Brain, 
  Pencil, 
  Users, 
  Database, 
  Search, 
  CheckCircle2, 
  GitBranch, 
  Sparkles,
  Layers,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useReveal } from '../hooks';
import { Container, Section, SectionLabel, SectionTitle, SectionDescription, Card, Badge, Button, IconBox } from '../components/ui';

/* ─── Floating Document Mockup Component ─── */
function DocumentMockup() {
  const [activeTab, setActiveTab] = useState('prd');
  const [ref, visible] = useReveal(0.2);

  const docs = {
    prd: {
      type: 'PRD',
      title: 'One-Click Checkout & Mobile Biometrics',
      sources: 'Mixpanel Analytics, Stripe Docs, Q2 UX Interviews',
      status: 'Ready for Review',
      p1: 'Customers currently encounter a 28% drop-off at Step 3 of checkout because of repetitive address inputs. Introducing native biometric passkeys reduces checkout duration from 84 seconds to under 12 seconds.',
      p2: 'Success Target: +14.8% mobile conversion lift with authorization latency below 600ms on 95th percentile requests.',
    },
    spec: {
      type: 'Tech Spec',
      title: 'WebAuthn Passkey Fallback Architecture',
      sources: 'W3C WebAuthn Spec, Internal Auth Service v2',
      status: 'In Engineering Review',
      p1: 'The authentication service will request platform authenticators through navigator.credentials.create(). If hardware biometrics are unavailable, the flow cleanly falls back to SMS or magic links without session loss.',
      p2: 'Security Invariant: Private keys never leave the secure enclave. All credential attestations are validated via SHA-256 challenge signatures.',
    },
    sop: {
      type: 'Team SOP',
      title: 'Incident Resolution & Post-Mortem Procedure',
      sources: 'DevOps Handbook, PagerDuty Runbooks',
      status: 'Active Standard',
      p1: 'When a Severity 1 incident occurs, the primary on-call engineer claims the incident within 5 minutes, spins up a dedicated Slack war room, and publishes the initial customer advisory within 15 minutes.',
      p2: 'Post-Mortem Rule: Blameless post-mortem documents must be published in Editorial.io within 48 hours with verified root-cause analysis.',
    }
  };

  const current = docs[activeTab];

  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="relative mx-auto max-w-4xl">
        {/* Document Frame */}
        <div className="bg-white rounded-2xl border border-border shadow-2xl shadow-black/[0.06] overflow-hidden border-gradient">
          {/* Doc Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-border-subtle bg-[#FBFBFA]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              <span className="text-xs text-ink-tertiary ml-2 font-mono">editorial.io / workspace</span>
            </div>

            {/* Doc Tabs */}
            <div className="flex items-center gap-1 bg-[#F0F0EA] p-0.5 rounded-lg text-xs font-medium">
              <button 
                onClick={() => setActiveTab('prd')}
                className={`px-3 py-1 rounded-md transition-all ${activeTab === 'prd' ? 'bg-white text-foreground shadow-sm font-semibold' : 'text-ink-tertiary hover:text-foreground'}`}
              >
                PRD
              </button>
              <button 
                onClick={() => setActiveTab('spec')}
                className={`px-3 py-1 rounded-md transition-all ${activeTab === 'spec' ? 'bg-white text-foreground shadow-sm font-semibold' : 'text-ink-tertiary hover:text-foreground'}`}
              >
                Tech Spec
              </button>
              <button 
                onClick={() => setActiveTab('sop')}
                className={`px-3 py-1 rounded-md transition-all ${activeTab === 'sop' ? 'bg-white text-foreground shadow-sm font-semibold' : 'text-ink-tertiary hover:text-foreground'}`}
              >
                SOP
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {current.status}
              </span>
            </div>
          </div>

          {/* Doc Content */}
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="px-2 py-0.5 rounded bg-accent-blue/10 text-accent-blue font-semibold">{current.type}</span>
              <span>•</span>
              <span>Grounded in team research</span>
              <span>•</span>
              <span className="text-emerald-600 font-medium">Citations verified</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              {current.title}
            </h3>

            <div className="space-y-3.5 text-sm sm:text-[15px] text-ink-secondary leading-relaxed">
              <div className="flex gap-3 bg-surface-elevated/40 p-4 rounded-xl border border-border-subtle">
                <div className="w-1 rounded-full bg-accent-blue shrink-0 my-0.5" />
                <p>{current.p1}</p>
              </div>
              <div className="flex gap-3 bg-surface-elevated/40 p-4 rounded-xl border border-border-subtle">
                <div className="w-1 rounded-full bg-accent-green shrink-0 my-0.5" />
                <p><span className="font-semibold text-foreground">Key Criterion:</span> {current.p2}</p>
              </div>
            </div>

            {/* Source citation bar */}
            <div className="flex items-center justify-between pt-3 border-t border-border-subtle text-xs text-ink-tertiary">
              <div className="flex items-center gap-2">
                <Search size={13} className="text-accent-blue" />
                <span>Verified Sources: <strong className="font-medium text-foreground">{current.sources}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-accent-green text-[11px] font-medium">
                <CheckCircle2 size={13} />
                <span>No hallucinations detected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating pill tags */}
        <div className="absolute -right-4 top-20 bg-white rounded-xl border border-border shadow-lg shadow-black/[0.06] px-4 py-3 animate-float hidden lg:block">
          <div className="flex items-center gap-2 text-xs">
            <Brain size={15} className="text-accent-purple" />
            <span className="font-medium text-foreground">Context linked</span>
          </div>
          <p className="text-[11px] text-muted mt-1">Grounding 3 live data sources</p>
        </div>

        <div className="absolute -left-4 bottom-10 bg-white rounded-xl border border-border shadow-lg shadow-black/[0.06] px-4 py-3 animate-float [animation-delay:2s] hidden lg:block">
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle2 size={15} className="text-accent-green" />
            <span className="font-medium text-foreground">Team Review Ready</span>
          </div>
          <p className="text-[11px] text-muted mt-1">Audit log preserved</p>
        </div>
      </div>
    </div>
  );
}

/* ─── How it works steps ─── */
function HowItWorks() {
  const steps = [
    { icon: Brain, title: 'Understand context', desc: 'Bring your rough briefs, meeting notes, or technical specs. Editorial.io connects the dots before drafting begins.', color: 'text-accent-purple' },
    { icon: Pencil, title: 'Generate intelligently', desc: 'Get a clean, structured document grounded in your actual inputs. No generic filler and no made-up facts.', color: 'text-accent-blue' },
    { icon: Search, title: 'Refine and research', desc: 'Edit in real time with AI right beside you. Rephrase sections, expand points, or link fresh sources effortlessly.', color: 'text-accent-warm' },
    { icon: Users, title: 'Review and collaborate', desc: 'Share with teammates, review changes, and maintain a permanent audit trail. Documentation stays fresh as your product evolves.', color: 'text-accent-green' },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#FBFBFA]">
      <Container className="relative z-10">
        <Section>
          <div className="text-center mb-16">
            <SectionLabel>How it works</SectionLabel>
            <SectionTitle className="mb-5" serif>
              From messy notes to clear, reliable documents.
            </SectionTitle>
            <SectionDescription className="mx-auto">
              Most tools only help you type. Editorial.io helps you understand context, structure arguments, and maintain team documentation that people can actually rely on.
            </SectionDescription>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const [ref, visible] = useReveal();
              return (
                <div
                  key={step.title}
                  ref={ref}
                  className={`relative transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <Card className="h-full relative overflow-hidden group hover:border-accent-blue/30 transition-all duration-300">
                    <div className="absolute top-4 right-4 text-xs font-mono text-ink-faint">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className={`w-11 h-11 rounded-xl bg-surface-elevated flex items-center justify-center mb-5 ${step.color} transition-transform duration-300 group-hover:scale-110`}>
                      <step.icon size={22} />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2 tracking-tight">{step.title}</h3>
                    <p className="text-sm text-ink-secondary leading-relaxed">{step.desc}</p>
                  </Card>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-border" />
                  )}
                </div>
              );
            })}
          </div>
        </Section>
      </Container>
    </section>
  );
}

/* ─── Capabilities grid ─── */
function Capabilities() {
  const capabilities = [
    { icon: FileText, title: 'AI Document Generation', desc: 'Feed in project context and receive clean, properly formatted PRDs, SOPs, specs, and research briefings in seconds.' },
    { icon: Database, title: 'Organizational Knowledge', desc: 'Store domain standards and product context once. Let every subsequent document automatically reflect your team terminology.' },
    { icon: Search, title: 'Contextual Research', desc: 'AI citations that point to real evidence in your workspace. Every statement is traceable to its original source.' },
    { icon: Pencil, title: 'Smart In-Editor Guidance', desc: 'Restructure paragraphs, improve readability, or adapt voice directly inside the canvas without jumping between chat tabs.' },
    { icon: GitBranch, title: 'Audit Trail & History', desc: 'Track how every document evolved over time. Know exactly what was revised, by whom, and with what prompt.' },
    { icon: Users, title: 'Collaborative Workspaces', desc: 'Bring product managers, engineers, and researchers together with structured reviews and sign-offs.' },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-white">
      <Container className="relative z-10">
        <Section>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <SectionLabel>Core capabilities</SectionLabel>
              <SectionTitle serif>
                Built for the entire lifecycle<br />
                <span className="text-ink-tertiary">of documentation.</span>
              </SectionTitle>
            </div>
            <Button variant="secondary" href="/features" className="self-start lg:self-auto">
              Explore all features <ArrowRight size={14} />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => {
              const [ref, visible] = useReveal();
              return (
                <div
                  key={cap.title}
                  ref={ref}
                  className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <Card className="h-full group hover:shadow-md transition-all duration-300">
                    <IconBox className="mb-5 group-hover:bg-accent-blue/10 group-hover:text-accent-blue transition-colors duration-300">
                      <cap.icon size={20} />
                    </IconBox>
                    <h3 className="text-base font-semibold text-foreground mb-2 tracking-tight">{cap.title}</h3>
                    <p className="text-sm text-ink-secondary leading-relaxed">{cap.desc}</p>
                  </Card>
                </div>
              );
            })}
          </div>
        </Section>
      </Container>
    </section>
  );
}

/* ─── Two audiences teaser ─── */
function AudienceTeaser() {
  const [ref, visible] = useReveal();

  return (
    <section className="relative py-24 sm:py-32 bg-[#FBFBFA]">
      <Container className="relative z-10">
        <Section>
          <div className="text-center mb-14">
            <SectionLabel>Built for two worlds</SectionLabel>
            <SectionTitle className="mb-5" serif>
              Personal speed. Team intelligence.
            </SectionTitle>
            <p className="text-base text-ink-secondary max-w-xl mx-auto">
              Whether you are an individual crafting critical specs or a growing company building a lasting knowledge asset.
            </p>
          </div>
          <div
            ref={ref}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Individuals */}
            <div className="relative bg-white rounded-2xl border border-border p-8 sm:p-10 overflow-hidden group hover:border-accent-blue/30 transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.03]">
              <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-accent-blue/[0.08] to-transparent rounded-bl-full pointer-events-none" />
              <Badge className="mb-6">For Individuals</Badge>
              <h3 className="text-2xl font-serif font-normal text-ink tracking-tight mb-3">
                Write first-rate documents, in record time.
              </h3>
              <p className="text-ink-secondary leading-relaxed mb-6 text-sm sm:text-base">
                Whether drafting an investor update, technical specification, or detailed research memo, Editorial.io helps you produce polished work without staring at a blank screen.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Turn disjointed bullet points into coherent drafts',
                  'Maintain live citations so you never lose reference sources',
                  'In-editor refinement tools for immediate polish',
                  'Personal repository of reusable writing context'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                    <CheckCircle2 size={16} className="text-accent-blue shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/solutions#individuals" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue hover:text-accent-blue/80 transition-colors group/link">
                Explore individual workflows <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </div>

            {/* Organizations */}
            <div className="relative bg-[#111113] rounded-2xl p-8 sm:p-10 overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-accent-blue/20 to-transparent rounded-bl-full pointer-events-none" />
              <div className="relative z-10">
                <Badge className="mb-6 border-white/15 bg-white/10 text-white/80">For Organizations</Badge>
                <h3 className="text-2xl font-serif font-normal text-white tracking-tight mb-3">
                  Your team memory, systematically organized.
                </h3>
                <p className="text-white/60 leading-relaxed mb-6 text-sm sm:text-base">
                  Stop losing institutional knowledge when engineers or product leaders change roles. Build a compounding library of shared documentation that scales with your business.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Shared organizational context across all team documents',
                    'Standardized quality and structure regardless of author',
                    'Collaborative review flows with explicit sign-offs',
                    'Grounding that prevents hallucinations with internal data'
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/solutions#organizations" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white transition-colors group/link">
                  Explore team workspaces <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </section>
  );
}

/* ─── Early Access CTA ─── */
function EarlyAccessCTA() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitting(true);
    try {
      await fetch('https://formsubmit.co/ajax/editorial.io.hq@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          _subject: `Early Access Signup: ${name}`,
          _template: 'table',
          source: 'Homepage Bottom CTA',
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  return (
    <section className="relative py-24 sm:py-32 bg-white border-t border-border-subtle">
      <Container size="narrow" className="relative z-10">
        <Section>
          <div className="text-center">
            <SectionLabel>Early Access</SectionLabel>
            <SectionTitle className="mb-5" serif>
              Experience the next generation of documentation.
            </SectionTitle>
            <SectionDescription className="mx-auto mb-10">
              We are carefully admitting teams and individuals to the private preview. Register your interest and we will get in touch with your access invitation.
            </SectionDescription>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 text-sm bg-[#FAFAF8] border border-border rounded-xl focus:outline-none focus:border-accent-blue focus:bg-white transition-all placeholder:text-ink-faint"
                />
                <input
                  type="email"
                  placeholder="Work email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 text-sm bg-[#FAFAF8] border border-border rounded-xl focus:outline-none focus:border-accent-blue focus:bg-white transition-all placeholder:text-ink-faint"
                />
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  disabled={submitting}
                  className="w-full justify-center bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3.5 shadow-md"
                >
                  {submitting ? 'Registering...' : 'Request Early Access'} <ArrowRight size={15} />
                </Button>
                <p className="text-xs text-muted text-center pt-2">
                  No automated newsletters. Inquiries go directly to <span className="font-mono text-ink-secondary">editorial.io.hq@gmail.com</span>.
                </p>
              </form>
            ) : (
              <div className="max-w-md mx-auto bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-scale-in">
                <CheckCircle2 size={36} className="text-emerald-600 mx-auto mb-3" />
                <h3 className="font-semibold text-foreground text-lg mb-2">Thank you, {name}.</h3>
                <p className="text-sm text-ink-secondary">
                  Your request has been received. Our team will contact you at <strong>{email}</strong> as early access invitations roll out.
                </p>
              </div>
            )}
          </div>
        </Section>
      </Container>
    </section>
  );
}


/* ═══════════════════════════════════════
   HOME PAGE COMPONENT
   ═══════════════════════════════════════ */
export default function HomePage() {
  const [quickEmail, setQuickEmail] = useState('');
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [quickSubmitting, setQuickSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Editorial.io — AI-Native Documentation Workspace';
    window.scrollTo(0, 0);
  }, []);

  const handleQuickSignup = async (e) => {
    e.preventDefault();
    if (!quickEmail) return;
    setQuickSubmitting(true);
    try {
      await fetch('https://formsubmit.co/ajax/editorial.io.hq@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          email: quickEmail,
          _subject: `Hero Pill Signup: ${quickEmail}`,
          _template: 'table',
          source: 'Voiceflow-Style Hero Input Pill',
        }),
      });
      setQuickSubmitted(true);
    } catch {
      setQuickSubmitted(true);
    }
    setQuickSubmitting(false);
  };

  return (
    <main className="bg-[#FAFAF8]">
      {/* ─── Hero Section (Voiceflow-Inspired Editorial Layout) ─── */}
      <section className="relative pt-20 sm:pt-24 pb-8 sm:pb-12 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          
          {/* Headline & Subhead */}
          <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] font-normal tracking-[-0.025em] leading-[1.08] text-[#141413] mb-4">
              Documentation teams love.<br className="hidden sm:inline" />
              Knowledge you can trust.
            </h1>

            <p className="text-base sm:text-lg md:text-[18px] text-[#5A5A55] max-w-xl mx-auto font-normal leading-relaxed">
              The AI-native documentation workspace that turns fragmented information into structured, reliable knowledge.
            </p>
          </div>

          {/* Floating Email Input Pill (Voiceflow style, overlapping the upper edge of the image) */}
          <div className="relative z-20 max-w-md sm:max-w-[450px] mx-auto -mb-6 sm:-mb-7 px-4">
            {!quickSubmitted ? (
              <form 
                onSubmit={handleQuickSignup} 
                className="bg-white rounded-full p-1.5 pl-5 sm:pl-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[#E2E2DA] flex items-center justify-between gap-2.5 transition-all focus-within:shadow-[0_12px_40px_rgba(37,99,235,0.16)] focus-within:border-[#2563EB]/40"
              >
                <input
                  type="email"
                  required
                  value={quickEmail}
                  onChange={(e) => setQuickEmail(e.target.value)}
                  placeholder="What's your work email?"
                  className="w-full bg-transparent text-sm sm:text-[15px] text-foreground placeholder:text-[#9A9A92] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={quickSubmitting}
                  className="shrink-0 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium rounded-full transition-all duration-200 active:scale-95 shadow-sm"
                >
                  {quickSubmitting ? 'Sending...' : 'Get started'}
                </button>
              </form>
            ) : (
              <div className="bg-white rounded-full px-5 py-3 shadow-lg border border-emerald-300 text-center text-sm font-medium text-emerald-800 flex items-center justify-center gap-2">
                <Check size={16} className="text-emerald-600" />
                <span>You're in! We will reach out to <strong>{quickEmail}</strong>.</span>
              </div>
            )}
          </div>

          {/* Cinematic Panoramic Landscape Banner with Floating Testimonial Card */}
          <div className="relative w-full">
            <div className="relative rounded-2xl sm:rounded-[28px] overflow-hidden border border-black/10 shadow-xl shadow-black/[0.05] bg-[#E8E8E2]">
              <img 
                src="/hero-coastal.png" 
                alt="Editorial.io Panoramic Perspective" 
                className="w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] object-cover object-[center_60%]" 
              />
              
              {/* Subtle gentle gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

              {/* Floating Product-Value Card (Voiceflow-matched position: bottom-right) */}
              <div className="absolute right-4 sm:right-7 bottom-4 sm:bottom-7 max-w-xs sm:max-w-sm md:max-w-[390px] bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-2xl border border-black/[0.06] text-left">
                <p className="text-xs sm:text-[13px] md:text-sm text-foreground/90 font-normal leading-relaxed mb-4">
                  “Editorial.io bridges the gap between raw team research and production-grade documentation. Everything is structured, verified, and grounded.”
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-semibold">
                      V
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Early Access Preview</div>
                      <div className="text-[11px] text-muted">Valispring Product Lab</div>
                    </div>
                  </div>
                  <Link to="/features" className="text-xs font-medium text-accent-blue hover:text-accent-blue/80 flex items-center gap-1 group">
                    Explore specs <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Customer / Credibility Strip (Voiceflow-inspired segmented horizontal bar) */}
          <div className="mt-5 sm:mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 border border-[#E5E5DE] rounded-xl bg-white divide-x divide-y md:divide-y-0 divide-[#E5E5DE] text-center overflow-hidden shadow-sm">
              <div className="py-3 px-4 flex items-center justify-center font-medium text-xs text-ink-tertiary uppercase tracking-wider bg-[#F9F9F6]">
                Built for
              </div>
              <div className="py-3 px-4 flex items-center justify-center text-xs sm:text-sm font-medium text-ink">
                Product PRDs
              </div>
              <div className="py-3 px-4 flex items-center justify-center text-xs sm:text-sm font-medium text-ink">
                Technical Specs
              </div>
              <div className="py-3 px-4 flex items-center justify-center text-xs sm:text-sm font-medium text-ink">
                Standard SOPs
              </div>
              <div className="py-3 px-4 flex items-center justify-center text-xs sm:text-sm font-medium text-ink">
                Decision Records
              </div>
              <div className="py-3 px-4 flex items-center justify-center text-xs sm:text-sm font-medium text-ink">
                Research Memos
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Interactive Product Preview Section ─── */}
      <section className="py-20 sm:py-28 bg-white border-b border-border-subtle">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionLabel>Inside the workspace</SectionLabel>
            <SectionTitle className="mb-4" serif>
              See what structured documentation looks like.
            </SectionTitle>
            <SectionDescription className="mx-auto">
              Inspect an interactive sample below. Every section is tied to verified research and team context.
            </SectionDescription>
          </div>
          
          <DocumentMockup />
        </Container>
      </section>

      {/* ─── Core Sections ─── */}
      <HowItWorks />
      <Capabilities />
      <AudienceTeaser />
      <EarlyAccessCTA />
    </main>
  );
}
