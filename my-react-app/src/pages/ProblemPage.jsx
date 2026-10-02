import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, Clock, Layers, Link2Off, Users, TrendingDown, FileText, Brain, Database, RefreshCw } from 'lucide-react';
import { useReveal } from '../hooks';
import { Container, Section, SectionLabel, SectionTitle, SectionDescription, Card, Badge, Button, IconBox } from '../components/ui';

/* ─── Statistic card ─── */
function StatCard({ stat, desc, source, sourceDetail, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl border border-border p-6 sm:p-8 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-3">{stat}</p>
      <p className="text-sm text-ink-secondary leading-relaxed mb-4">{desc}</p>
      <div className="pt-3 border-t border-border-subtle">
        <p className="text-xs text-muted leading-relaxed">
          <span className="font-medium text-ink-tertiary">Source:</span> {source}
        </p>
        {sourceDetail && (
          <p className="text-xs text-ink-faint mt-1 leading-relaxed">{sourceDetail}</p>
        )}
      </div>
    </div>
  );
}

/* ─── Challenge card ─── */
function ChallengeCard({ icon: Icon, title, desc, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`group bg-white rounded-2xl border border-border p-6 hover:border-red-200 hover:shadow-sm transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4 text-red-400 group-hover:bg-red-100 transition-colors">
        <Icon size={20} />
      </div>
      <h3 className="text-base font-semibold tracking-tight mb-2">{title}</h3>
      <p className="text-sm text-ink-secondary leading-relaxed">{desc}</p>
    </div>
  );
}


export default function ProblemPage() {
  useEffect(() => {
    document.title = 'The Problem | Editorial.io';
    window.scrollTo(0, 0);
  }, []);

  const challenges = [
    {
      icon: Layers,
      title: 'Fragmented information',
      desc: 'Critical knowledge lives in email threads, chat messages, meeting notes, and individual minds. When it\'s time to create a document, the hardest part is finding and assembling the right context.',
    },
    {
      icon: RefreshCw,
      title: 'Repetitive manual writing',
      desc: 'Teams write similar documents repeatedly: the same structures, the same context gathering, the same formatting decisions. Each new PRD, SOP, or spec starts from scratch.',
    },
    {
      icon: Link2Off,
      title: 'Disconnected tools',
      desc: 'Research happens in one tool, writing in another, review in a third. Context is lost at every handoff. The document never fully reflects the knowledge behind it.',
    },
    {
      icon: AlertTriangle,
      title: 'Inconsistent quality',
      desc: 'Without structured processes, documentation quality varies wildly across teams and authors. Standards exist in style guides that nobody reads.',
    },
    {
      icon: TrendingDown,
      title: 'Lost institutional knowledge',
      desc: 'When people leave, their knowledge leaves with them. Documentation that should preserve organizational intelligence instead captures only a fraction of it.',
    },
    {
      icon: Clock,
      title: 'Documents that decay',
      desc: 'Documents go stale the moment they\'re published. Maintaining accuracy over time requires effort that most teams can\'t sustain.',
    },
  ];

  return (
    <main className="pt-24">
      {/* Hero */}
      <Section className="py-16 sm:py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <SectionLabel>The Problem</SectionLabel>
            <SectionTitle className="mb-5" serif>
              Documentation is broken.<br />
              <span className="text-ink-tertiary">Everyone knows it.</span>
            </SectionTitle>
            <SectionDescription className="mx-auto">
              Organizations lose billions in productivity to poor documentation. Not because people don't care, but because the tools and processes haven't evolved for how work actually happens today.
            </SectionDescription>
          </div>
        </Container>
      </Section>

      {/* Research-backed statistics */}
      <Section className="py-16 sm:py-24 bg-cream">
        <Container>
          <div className="text-center mb-14">
            <SectionLabel>The research</SectionLabel>
            <SectionTitle className="mb-5">The cost of information<br />fragmentation.</SectionTitle>
            <SectionDescription className="mx-auto">
              These aren't hypothetical problems. Leading research firms have quantified the impact of poor information management on organizational productivity.
            </SectionDescription>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <StatCard
              stat="19.8%"
              desc="of the workweek, nearly one day out of every five, is spent by knowledge workers searching for and gathering information."
              source="McKinsey Global Institute, 'The Social Economy,' 2012."
              sourceDetail="This measures general information search and gathering time, not documentation-specific tasks. The implication for documentation workflows is that a significant share of document creation effort goes to assembling context rather than writing."
              delay={0}
            />
            <StatCard
              stat="9.3 hrs"
              desc="per week are spent by employees searching for information, averaging across organizations of all sizes."
              source="McKinsey & Company research on workplace productivity."
              sourceDetail="This figure reflects time spent on general information retrieval. For documentation-heavy roles, the proportion of search time dedicated to finding context for documents is likely higher."
              delay={100}
            />
            <StatCard
              stat="68%"
              desc="of IT professionals report that inadequate documentation leads to workflow disruptions in their organizations."
              source="Industry survey data, cited in enterprise documentation research."
              sourceDetail="This reflects a common pattern across technology organizations where documentation gaps directly impede engineering and operational workflows."
              delay={200}
            />
          </div>

          <div className="mt-8 bg-white rounded-2xl border border-border p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle size={16} className="text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">A note on these statistics</p>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  The research cited above measures general workplace information challenges, not documentation-specific metrics. We include them because they illuminate the broader context in which documentation problems exist: when information is fragmented and hard to find, creating reliable documentation becomes exponentially harder. We have preserved the original context of each statistic and encourage readers to consult the source reports directly.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Challenges grid */}
      <Section className="py-16 sm:py-24">
        <Container>
          <div className="text-center mb-14">
            <SectionLabel>The challenges</SectionLabel>
            <SectionTitle className="mb-5">Six problems that<br />compound each other.</SectionTitle>
            <SectionDescription className="mx-auto">
              These aren't isolated issues. Each challenge feeds the others, creating a cycle that makes documentation increasingly difficult to get right.
            </SectionDescription>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {challenges.map((c, i) => (
              <ChallengeCard key={c.title} {...c} delay={i * 80} />
            ))}
          </div>
        </Container>
      </Section>

      {/* The vision — connecting to Editorial.io */}
      <Section className="py-20 sm:py-28 bg-midnight text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <SectionLabel className="!text-white/40">The Editorial.io vision</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] mb-6">
              Documentation needs a<br />
              <span className="text-white/40">fundamentally different system.</span>
            </h2>
            <p className="text-lg text-white/50 leading-relaxed mb-10">
              Not another text editor with AI bolted on. Not another template library. A workspace that understands context, preserves knowledge, and makes creating reliable documentation the default, not the exception.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {[
                { icon: Brain, label: 'Context-first', desc: 'Understands what you need before writing begins' },
                { icon: Database, label: 'Knowledge-driven', desc: 'Every document builds on what came before' },
                { icon: FileText, label: 'Structure-native', desc: 'Produces structured documents, not walls of text' },
              ].map((v) => (
                <div key={v.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center">
                  <v.icon size={22} className="text-white/40 mx-auto mb-3" />
                  <p className="text-sm font-medium mb-1">{v.label}</p>
                  <p className="text-xs text-white/40">{v.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/features"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium bg-white text-midnight rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/10"
              >
                See How It Works <ArrowRight size={15} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium border border-white/15 text-white/70 rounded-full hover:bg-white/5 hover:text-white transition-all duration-300"
              >
                Get Early Access
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
