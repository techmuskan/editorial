import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Brain, Pencil, Search, Users, Database, GitBranch, Shield, Zap, Layers, CheckCircle2, BookOpen, Settings, Plug, History, Eye, MessageSquare } from 'lucide-react';
import { useReveal } from '../hooks';
import { Container, Section, SectionLabel, SectionTitle, SectionDescription, Card, Badge, Button, IconBox } from '../components/ui';

/* ─── Feature Showcase Block ─── */
function FeatureShowcase({ icon: Icon, label, title, desc, capabilities, accent = 'blue', badge, reverse = false }) {
  const [ref, visible] = useReveal();
  const accentColors = {
    blue: { bg: 'bg-accent-blue/10', text: 'text-accent-blue', border: 'border-accent-blue/20', dot: 'bg-accent-blue' },
    green: { bg: 'bg-accent-green/10', text: 'text-accent-green', border: 'border-accent-green/20', dot: 'bg-accent-green' },
    purple: { bg: 'bg-accent-purple/10', text: 'text-accent-purple', border: 'border-accent-purple/20', dot: 'bg-accent-purple' },
    warm: { bg: 'bg-accent-warm/10', text: 'text-accent-warm', border: 'border-accent-warm/20', dot: 'bg-accent-warm' },
  };
  const a = accentColors[accent];

  return (
    <div
      ref={ref}
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-center transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-9 h-9 rounded-xl ${a.bg} flex items-center justify-center ${a.text}`}>
            <Icon size={18} />
          </div>
          <SectionLabel className="!mb-0">{label}</SectionLabel>
          {badge && (
            <Badge className="text-[10px] py-0.5 px-2">{badge}</Badge>
          )}
        </div>
        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-[1.15] mb-4">{title}</h3>
        <p className="text-ink-secondary leading-relaxed mb-6">{desc}</p>
        <ul className="space-y-3">
          {capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-2.5 text-sm text-ink-secondary">
              <div className={`w-1.5 h-1.5 rounded-full ${a.dot} mt-1.5 shrink-0`} />
              {cap}
            </li>
          ))}
        </ul>
      </div>

      {/* Visual placeholder */}
      <div className="flex-1 w-full">
        <div className={`rounded-2xl border ${a.border} bg-gradient-to-br from-white to-surface-elevated p-1`}>
          <div className="rounded-xl bg-white border border-border-subtle overflow-hidden">
            {/* Mini toolbar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-subtle bg-cream/30">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-border" />
                <div className="w-2 h-2 rounded-full bg-border" />
                <div className="w-2 h-2 rounded-full bg-border" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className={`px-2.5 py-0.5 rounded text-[10px] font-medium ${a.bg} ${a.text}`}>
                  {label}
                </div>
              </div>
            </div>
            {/* Content area */}
            <div className="p-6 sm:p-8 min-h-[220px] flex items-center justify-center">
              <div className="text-center">
                <Icon size={36} className="text-ink-faint/50 mx-auto mb-2" />
                <p className="text-xs text-ink-faint">Interactive preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Small feature card ─── */
function SmallFeature({ icon: Icon, title, desc, badge, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl border border-border p-6 hover:border-muted hover:shadow-sm transition-all duration-500 group ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <IconBox className="group-hover:bg-accent-blue/5 group-hover:border-accent-blue/10 transition-colors">
          <Icon size={18} />
        </IconBox>
        {badge && <Badge className="text-[10px] py-0.5 px-2">{badge}</Badge>}
      </div>
      <h4 className="text-sm font-semibold text-foreground mb-1.5 tracking-tight">{title}</h4>
      <p className="text-sm text-ink-secondary leading-relaxed">{desc}</p>
    </div>
  );
}


export default function FeaturesPage() {
  useEffect(() => {
    document.title = 'Features | Editorial.io';
    window.scrollTo(0, 0);
  }, []);

  const additionalFeatures = [
    { icon: History, title: 'Version History', desc: 'Full document history with the ability to compare and restore previous versions.', badge: 'MVP' },
    { icon: Eye, title: 'Document Provenance', desc: 'Trace every claim, edit, and decision back to its source and author.', badge: 'MVP' },
    { icon: BookOpen, title: 'Unified Workspace', desc: 'PRDs, SOPs, technical docs, research, and reports, all in one environment.', badge: 'MVP' },
    { icon: MessageSquare, title: 'Document Review', desc: 'Inline comments, review requests, and approval workflows for teams.', badge: 'MVP' },
    { icon: Plug, title: 'Integration-Ready', desc: 'Designed to connect with external tools, APIs, and data sources.', badge: 'Roadmap' },
    { icon: Settings, title: 'MCP Capabilities', desc: 'Model Context Protocol support for advanced AI agent workflows.', badge: 'Roadmap' },
  ];

  return (
    <main className="pt-24">
      {/* Hero */}
      <Section className="py-16 sm:py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <SectionLabel>Features</SectionLabel>
            <SectionTitle className="mb-5" serif>
              A documentation system,<br />
              <span className="text-ink-tertiary">not a collection of tools.</span>
            </SectionTitle>
            <SectionDescription className="mx-auto">
              Every feature in Editorial.io works as part of one integrated system. Context flows from knowledge to generation to editing to review, so nothing falls through the cracks.
            </SectionDescription>
          </div>
        </Container>
      </Section>

      {/* Primary features */}
      <Section className="py-12 sm:py-16 bg-cream">
        <Container>
          <div className="space-y-24 sm:space-y-32">
            <FeatureShowcase
              icon={FileText}
              label="Document Generation"
              title="AI-native document creation from briefs and context."
              desc="Describe what you need, provide supporting materials and context, and Editorial.io generates a structured document grounded directly in your specific inputs, never generic filler."
              capabilities={[
                'Generate PRDs, SOPs, technical specifications, research reports, and business documents',
                'AI understands document structure: sections, hierarchies, tables, and cross-references',
                'Every generated claim connects to the sources and context you provided',
                'Output quality improves as your knowledge base grows',
              ]}
              accent="blue"
              badge="MVP"
            />

            <FeatureShowcase
              icon={Search}
              label="Contextual Research"
              title="Source-grounded outputs, not hallucinated text."
              desc="Editorial.io integrates research directly into the writing process. Claims connect to evidence, references stay linked, and you can always trace why something was written."
              capabilities={[
                'Pull in relevant context while writing, not as a disconnected separate step',
                'Source attribution for every referenced claim or data point',
                'AI-assisted fact-checking against provided materials',
                'Research findings become part of your knowledge base for future documents',
              ]}
              accent="warm"
              reverse
              badge="MVP"
            />

            <FeatureShowcase
              icon={Pencil}
              label="Smart Editing"
              title="Refine documents with AI, directly inside the editor."
              desc="Do not copy-paste between a chat interface and your document. Editorial.io editing tools work where you write: rewrite paragraphs, adjust tone, expand sections, or restructure content in-place."
              capabilities={[
                'AI-powered rewriting, expansion, and summarization at the section level',
                'Tone and style adjustment without losing substance',
                'Structural editing: reorder sections, merge content, split complex passages',
                'Inline suggestions that respect the document\'s existing context',
              ]}
              accent="purple"
              badge="MVP"
            />

            <FeatureShowcase
              icon={Database}
              label="Knowledge Base"
              title="Organizational intelligence that grows with every document."
              desc="Build a persistent knowledge layer that informs all future documentation. Upload existing documents, research, and reference materials so Editorial.io learns your domain, terminology, and standards."
              capabilities={[
                'Upload documents, notes, and reference materials to build organizational context',
                'AI draws on your knowledge base when generating new documents',
                'Reusable knowledge that reduces redundant research and writing',
                'Personal knowledge for individuals; shared knowledge for teams',
              ]}
              accent="green"
              reverse
              badge="MVP"
            />

            <FeatureShowcase
              icon={Users}
              label="Collaboration"
              title="Team workspaces for documentation that matters."
              desc="Create shared workspaces where teams collaborate on documentation from initial drafts through review and approval. Every change is tracked, every decision is accountable."
              capabilities={[
                'Shared organization workspaces with role-based access',
                'Document review workflows with comments and approval chains',
                'Full version history with diff comparison',
                'Team members can contribute to the shared knowledge base',
              ]}
              accent="blue"
              badge="MVP"
            />
          </div>
        </Container>
      </Section>

      {/* Additional features grid */}
      <Section className="py-16 sm:py-24">
        <Container>
          <div className="text-center mb-14">
            <SectionLabel>And more</SectionLabel>
            <SectionTitle className="mb-5">Everything a documentation<br />workspace needs.</SectionTitle>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalFeatures.map((f, i) => (
              <SmallFeature key={f.title} {...f} delay={i * 60} />
            ))}
          </div>

          <div className="mt-8 bg-cream rounded-2xl border border-border-subtle p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                <Zap size={16} className="text-accent-blue" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">MVP vs. Roadmap</p>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  Features marked <Badge className="text-[10px] py-0 px-1.5 mx-1">MVP</Badge> are available or actively being built for our initial release. Features marked <Badge className="text-[10px] py-0 px-1.5 mx-1">Roadmap</Badge> represent our intended direction and are planned for future development. We're transparent about what exists today and what we're working toward.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Bottom CTA */}
      <Section className="py-20 sm:py-28 bg-cream">
        <Container size="narrow">
          <div className="text-center">
            <SectionTitle className="mb-5" serif>Ready to experience<br />documentation, reimagined?</SectionTitle>
            <SectionDescription className="mx-auto mb-10">
              Editorial.io is currently in early access. Join the waitlist to be among the first to try a fundamentally different approach to documentation.
            </SectionDescription>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/contact" variant="primary" size="lg">
                Request Early Access <ArrowRight size={15} />
              </Button>
              <Button href="/comparison" variant="secondary" size="lg">
                See How We Compare
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
