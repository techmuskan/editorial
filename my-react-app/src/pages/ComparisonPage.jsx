import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MinusCircle, Circle, FileText, Brain, Pencil, Search, Users, Database, GitBranch, Shield, Layers } from 'lucide-react';
import { useReveal } from '../hooks';
import { Container, Section, SectionLabel, SectionTitle, SectionDescription, Card, Badge, Button } from '../components/ui';

/* ─── Comparison indicator ─── */
function CompIndicator({ level }) {
  if (level === 'full') return <CheckCircle2 size={16} className="text-accent-green" />;
  if (level === 'partial') return <Circle size={16} className="text-amber-400" />;
  if (level === 'none') return <MinusCircle size={16} className="text-ink-faint" />;
  return null;
}

function CompLabel({ level }) {
  const labels = { full: 'Core capability', partial: 'Partial / varies', none: 'Not designed for this' };
  const colors = { full: 'text-accent-green', partial: 'text-amber-500', none: 'text-ink-faint' };
  return <span className={`text-xs ${colors[level]}`}>{labels[level]}</span>;
}

/* ─── Approach card ─── */
function ApproachCard({ title, desc, traits, variant = 'default' }) {
  const [ref, visible] = useReveal();
  const isEditorial = variant === 'editorial';
  return (
    <div
      ref={ref}
      className={`rounded-2xl border p-6 sm:p-8 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${
        isEditorial
          ? 'bg-midnight text-white border-white/[0.08] ring-1 ring-accent-blue/20'
          : 'bg-white border-border'
      }`}
    >
      {isEditorial && <Badge className="mb-4 border-accent-blue/20 bg-accent-blue/10 text-accent-blue">Editorial.io Approach</Badge>}
      <h3 className={`text-xl font-semibold tracking-tight mb-2 ${isEditorial ? 'text-white' : 'text-foreground'}`}>{title}</h3>
      <p className={`text-sm leading-relaxed mb-6 ${isEditorial ? 'text-white/50' : 'text-ink-secondary'}`}>{desc}</p>
      <ul className="space-y-3">
        {traits.map((t) => (
          <li key={t.label} className="flex items-start gap-3">
            <CompIndicator level={t.level} />
            <div>
              <p className={`text-sm font-medium ${isEditorial ? 'text-white/90' : 'text-foreground'}`}>{t.label}</p>
              <p className={`text-xs leading-relaxed mt-0.5 ${isEditorial ? 'text-white/40' : 'text-ink-tertiary'}`}>{t.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default function ComparisonPage() {
  useEffect(() => {
    document.title = 'Comparison | Editorial.io';
    window.scrollTo(0, 0);
  }, []);

  const dimensions = [
    {
      category: 'Understanding & Context',
      icon: Brain,
      items: [
        {
          dimension: 'Contextual understanding',
          traditional: 'The writer holds all context in their head. Documents start from manual research and memory.',
          aiAssistant: 'Can process text you paste into the chat, but lacks persistent context about your domain or organization.',
          editorial: 'Built around context. Upload briefs, reference materials, and organizational knowledge before generation begins.',
        },
        {
          dimension: 'Organizational knowledge',
          traditional: 'Lives in wikis, shared drives, and tribal knowledge. Rarely connected to document creation.',
          aiAssistant: 'No organizational memory. Every conversation starts fresh.',
          editorial: 'Persistent knowledge base that grows over time and informs every new document.',
        },
      ],
    },
    {
      category: 'Document Quality',
      icon: FileText,
      items: [
        {
          dimension: 'Structured documents',
          traditional: 'Structure depends entirely on the writer\'s skill. Templates help but aren\'t enforced.',
          aiAssistant: 'Can generate formatted text, but output structure is prompt-dependent and inconsistent.',
          editorial: 'AI understands document types (PRDs, SOPs, specs) and generates proper structure natively.',
        },
        {
          dimension: 'Source traceability',
          traditional: 'Manual citations. Easy to lose track of where claims originated.',
          aiAssistant: 'Sources are not tracked. Generated text has no provenance.',
          editorial: 'Every claim connects to its source. Full provenance chain from context to output.',
        },
      ],
    },
    {
      category: 'Editing & Workflow',
      icon: Pencil,
      items: [
        {
          dimension: 'Editing workflow',
          traditional: 'Manual editing in a word processor or docs tool.',
          aiAssistant: 'Copy-paste between chat and editor. Context lost at every handoff.',
          editorial: 'Smart editing directly inside the document. AI understands surrounding context.',
        },
        {
          dimension: 'Collaboration',
          traditional: 'Real-time collaboration in tools like Google Docs. Mature but disconnected from AI.',
          aiAssistant: 'Single-user chat interface. No collaboration features.',
          editorial: 'Team workspaces with review workflows, version history, and shared knowledge.',
        },
      ],
    },
  ];

  return (
    <main className="pt-24">
      {/* Hero */}
      <Section className="py-16 sm:py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <SectionLabel>Comparison</SectionLabel>
            <SectionTitle className="mb-5" serif>
              A different approach<br />
              <span className="text-ink-tertiary">to documentation.</span>
            </SectionTitle>
            <SectionDescription className="mx-auto">
              Editorial.io isn't trying to replace your text editor or your AI assistant. It's solving a different problem: building an integrated system for the entire documentation lifecycle.
            </SectionDescription>
          </div>
        </Container>
      </Section>

      {/* Three approaches overview */}
      <Section className="py-12 sm:py-16 bg-cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <ApproachCard
              title="Traditional Workflow"
              desc="Manual writing in word processors and docs tools. The writer does everything: research, structure, write, edit, review."
              traits={[
                { level: 'full', label: 'Writer control', desc: 'Complete control over every word and decision' },
                { level: 'partial', label: 'Collaboration', desc: 'Real-time editing but disconnected from AI and context' },
                { level: 'none', label: 'AI assistance', desc: 'No intelligent assistance beyond spell-check' },
                { level: 'none', label: 'Knowledge integration', desc: 'Context lives outside the writing tool' },
              ]}
            />
            <ApproachCard
              title="AI Writing Assistant"
              desc="Chat-based AI tools that generate text on demand. Good for quick drafts, but disconnected from your real context."
              traits={[
                { level: 'full', label: 'Speed', desc: 'Fast text generation from prompts' },
                { level: 'partial', label: 'Quality', desc: 'Output quality depends heavily on prompt engineering' },
                { level: 'none', label: 'Context persistence', desc: 'No memory between conversations' },
                { level: 'none', label: 'Document structure', desc: 'Generates text blocks, not structured documents' },
              ]}
            />
            <ApproachCard
              title="Editorial.io"
              desc="An integrated workspace where context, generation, editing, and review work together as one documentation system."
              variant="editorial"
              traits={[
                { level: 'full', label: 'Context-first generation', desc: 'Documents grounded in your actual context and knowledge' },
                { level: 'full', label: 'Persistent knowledge', desc: 'Organizational memory that grows with every document' },
                { level: 'full', label: 'Structured output', desc: 'Native understanding of document types and structures' },
                { level: 'partial', label: 'Maturity', desc: 'Early-stage product with features actively developing' },
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* Detailed comparison table */}
      <Section className="py-16 sm:py-24">
        <Container>
          <div className="text-center mb-14">
            <SectionLabel>Detailed comparison</SectionLabel>
            <SectionTitle className="mb-5">How the approaches<br />differ in practice.</SectionTitle>
            <SectionDescription className="mx-auto">
              We've tried to be fair and specific. Every approach has genuine strengths, and the question is which one matches what you're trying to accomplish.
            </SectionDescription>
          </div>

          {dimensions.map((dim) => (
            <div key={dim.category} className="mb-12 last:mb-0">
              <div className="flex items-center gap-3 mb-6">
                <dim.icon size={18} className="text-ink-tertiary" />
                <h3 className="text-lg font-semibold tracking-tight">{dim.category}</h3>
              </div>
              <div className="space-y-4">
                {dim.items.map((item) => {
                  const [ref, visible] = useReveal();
                  return (
                    <div
                      key={item.dimension}
                      ref={ref}
                      className={`bg-white rounded-2xl border border-border overflow-hidden transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    >
                      <div className="px-6 py-4 border-b border-border-subtle bg-cream/30">
                        <h4 className="text-sm font-semibold text-foreground">{item.dimension}</h4>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border-subtle">
                        <div className="px-6 py-4">
                          <p className="text-xs font-medium text-ink-faint uppercase tracking-wide mb-2">Traditional</p>
                          <p className="text-sm text-ink-secondary leading-relaxed">{item.traditional}</p>
                        </div>
                        <div className="px-6 py-4">
                          <p className="text-xs font-medium text-ink-faint uppercase tracking-wide mb-2">AI Assistant</p>
                          <p className="text-sm text-ink-secondary leading-relaxed">{item.aiAssistant}</p>
                        </div>
                        <div className="px-6 py-4 bg-accent-blue/[0.02]">
                          <p className="text-xs font-medium text-accent-blue uppercase tracking-wide mb-2">Editorial.io</p>
                          <p className="text-sm text-ink-secondary leading-relaxed">{item.editorial}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Honesty note */}
          <div className="mt-12 bg-cream rounded-2xl border border-border-subtle p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                <Shield size={16} className="text-accent-blue" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">An honest comparison</p>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  This comparison reflects our genuine understanding of how different approaches work. Traditional workflows and AI assistants each have real strengths. Editorial.io advantage isn't doing everything better, but integrating the documentation lifecycle into one system where context, generation, editing, and review reinforce each other. As an early-stage product, we're still building toward this vision.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Bottom CTA */}
      <Section className="py-20 sm:py-28 bg-midnight text-white">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1] mb-5">
              See for yourself.
            </h2>
            <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-xl mx-auto">
              The best way to understand how Editorial.io differs is to try it. Join our early access program and experience a new approach to documentation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium bg-white text-midnight rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/10"
              >
                Get Early Access <ArrowRight size={15} />
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium border border-white/15 text-white/70 rounded-full hover:bg-white/5 hover:text-white transition-all duration-300"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
