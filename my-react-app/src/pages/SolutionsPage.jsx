import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText, Brain, Pencil, Users, Database, Layers, Search, Shield, Zap, BookOpen, Building2, User, GraduationCap, Briefcase, FlaskConical, BarChart3 } from 'lucide-react';
import { useReveal } from '../hooks';
import { Container, Section, SectionLabel, SectionTitle, SectionDescription, Card, Badge, Button, IconBox } from '../components/ui';

/* ─── Individual persona cards ─── */
function PersonaCard({ icon: Icon, title, desc, color }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <Card className="h-full group">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color} transition-transform duration-300 group-hover:scale-110`}>
          <Icon size={20} />
        </div>
        <h4 className="text-sm font-semibold text-foreground mb-1.5">{title}</h4>
        <p className="text-sm text-ink-secondary leading-relaxed">{desc}</p>
      </Card>
    </div>
  );
}

/* ─── Feature row ─── */
function FeatureRow({ icon: Icon, title, desc, items, reverse = false }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="flex-1">
        <IconBox className="mb-5">
          <Icon size={18} />
        </IconBox>
        <h3 className="text-xl font-semibold tracking-tight mb-3">{title}</h3>
        <p className="text-ink-secondary leading-relaxed mb-5">{desc}</p>
        <ul className="space-y-2.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-ink-secondary">
              <CheckCircle2 size={15} className="text-accent-green shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 w-full">
        <div className="bg-surface-elevated rounded-2xl border border-border-subtle p-6 sm:p-8 aspect-[4/3] flex items-center justify-center">
          <div className="text-center">
            <Icon size={40} className="text-ink-faint mx-auto mb-3" />
            <p className="text-sm text-ink-faint">Visual coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function SolutionsPage() {
  useEffect(() => {
    document.title = 'Solutions | Editorial.io';
    window.scrollTo(0, 0);
    // Handle hash scrolling
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  const personas = [
    { icon: Briefcase, title: 'Founders & Executives', desc: 'Investor decks, strategy docs, and board reports that reflect genuine rigor.', color: 'bg-accent-blue/10 text-accent-blue' },
    { icon: Layers, title: 'Product Managers', desc: 'PRDs, requirement specs, and roadmap documents grounded in real product context.', color: 'bg-accent-purple/10 text-accent-purple' },
    { icon: FlaskConical, title: 'Researchers', desc: 'Literature reviews, experiment reports, and analysis documents with source traceability.', color: 'bg-accent-green/10 text-accent-green' },
    { icon: GraduationCap, title: 'Students & Academics', desc: 'Thesis chapters, research proposals, and structured academic writing.', color: 'bg-accent-warm/10 text-accent-warm' },
    { icon: BarChart3, title: 'Consultants & Analysts', desc: 'Client deliverables, market analyses, and business case documents.', color: 'bg-red-500/10 text-red-500' },
    { icon: FileText, title: 'Technical Writers', desc: 'API docs, architecture specs, and system documentation that stays current.', color: 'bg-cyan-600/10 text-cyan-600' },
  ];

  const orgFeatures = [
    {
      icon: Database,
      title: 'Organizational Knowledge Base',
      desc: 'Build a living repository of your organization\'s institutional knowledge. Every team member contributes; every document benefits.',
      items: ['Centralized knowledge that persists across teams', 'Auto-context for new document generation', 'Reduces knowledge silos and tribal knowledge loss'],
    },
    {
      icon: Shield,
      title: 'Consistent Documentation Standards',
      desc: 'Ensure every document meets your organization\'s quality and formatting standards. Templates, style guides, and structural consistency, all enforced by AI.',
      items: ['Organization-wide templates and structures', 'Style and tone consistency across authors', 'Compliance-ready documentation workflows'],
    },
    {
      icon: Users,
      title: 'Team Collaboration & Review',
      desc: 'Shared workspaces where teams create, review, and refine documentation together. Every change tracked, every decision accountable.',
      items: ['Multi-author collaborative editing', 'Review workflows with approval chains', 'Full audit trail and version history'],
    },
    {
      icon: Zap,
      title: 'Context-Aware Generation',
      desc: 'Generate documents using your organization\'s internal context, not generic AI. Outputs reflect your domain, your terminology, and your standards.',
      items: ['Documents informed by internal knowledge', 'Domain-specific terminology and conventions', 'Dramatically faster first drafts for teams'],
    },
  ];

  return (
    <main className="pt-24">
      {/* Hero */}
      <Section className="py-16 sm:py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <SectionLabel>Solutions</SectionLabel>
            <SectionTitle className="mb-5" serif>
              Built for how you work,<br />
              <span className="text-ink-tertiary">alone or together.</span>
            </SectionTitle>
            <SectionDescription className="mx-auto">
              Whether you're an individual creating better documents or an organization building documentation infrastructure, Editorial.io adapts to your needs.
            </SectionDescription>
          </div>
        </Container>
      </Section>

      {/* ═══ FOR INDIVIDUALS ═══ */}
      <section id="individuals" className="scroll-mt-24 py-20 sm:py-28 bg-cream">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <User size={18} className="text-accent-blue" />
                <SectionLabel className="!mb-0">For Individuals</SectionLabel>
              </div>
              <SectionTitle>Create professional<br />documents, faster.</SectionTitle>
            </div>
            <SectionDescription className="lg:max-w-md">
              Editorial.io gives individuals the same documentation quality that used to require a team: AI-assisted generation, contextual research, and smart editing in one workspace.
            </SectionDescription>
          </div>

          {/* Persona cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {personas.map((p, i) => (
              <PersonaCard key={p.title} {...p} />
            ))}
          </div>

          {/* Individual features */}
          <div className="space-y-16">
            <FeatureRow
              icon={Brain}
              title="AI-Assisted Structured Writing"
              desc="Don't start from a blank page. Describe what you need, provide your context, and Editorial.io generates a structured first draft grounded in real information."
              items={[
                'Generate PRDs, reports, proposals, and specs from briefs',
                'AI understands document structure, not just text',
                'Every output connects to the sources you provided',
              ]}
            />
            <FeatureRow
              icon={Search}
              title="Research That Stays Connected"
              desc="Pull in relevant research and context as you write. Sources stay linked to the claims they support with no disconnected reference lists."
              items={[
                'Contextual research integrated into your workflow',
                'Source attribution for every referenced claim',
                'Build personal knowledge for future documents',
              ]}
              reverse
            />
            <FeatureRow
              icon={Pencil}
              title="Smart In-Document Editing"
              desc="Refine your documents with AI assistance directly inside the editor. Rewrite paragraphs, expand sections, and adjust tone without leaving the document."
              items={[
                'AI-powered rewriting and refinement',
                'Tone and style adjustment on demand',
                'Section-level restructuring and expansion',
              ]}
            />
          </div>

          <div className="mt-16 text-center">
            <Button href="/contact" variant="primary" size="lg">
              Join the Individual Waitlist <ArrowRight size={15} />
            </Button>
          </div>
        </Container>
      </section>

      {/* ═══ FOR ORGANIZATIONS ═══ */}
      <section id="organizations" className="scroll-mt-24 py-20 sm:py-28 bg-midnight text-white">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Building2 size={18} className="text-accent-green" />
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">For Organizations</p>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1]">
                Documentation as<br />
                <span className="text-white/40">organizational infrastructure.</span>
              </h2>
            </div>
            <p className="text-lg text-white/50 leading-relaxed lg:max-w-md">
              Move beyond individual productivity. Editorial.io helps organizations build a documentation layer that preserves knowledge, ensures consistency, and scales with your team.
            </p>
          </div>

          {/* Org features grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {orgFeatures.map((f, i) => {
              const [ref, visible] = useReveal();
              return (
                <div
                  key={f.title}
                  ref={ref}
                  className={`bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 sm:p-8 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-5 text-white/60">
                    <f.icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">{f.desc}</p>
                  <ul className="space-y-2">
                    {f.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-white/40">
                        <CheckCircle2 size={15} className="text-accent-green shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact#organizations"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium bg-white text-midnight rounded-full hover:bg-white/90 transition-all duration-300 active:scale-[0.97] shadow-lg shadow-white/10"
            >
              Talk to Our Team <ArrowRight size={15} />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium border border-white/15 text-white/70 rounded-full hover:bg-white/5 hover:text-white transition-all duration-300"
            >
              View All Features
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
