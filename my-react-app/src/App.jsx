import  { useState, useEffect} from "react";
import {
  FileText,
  Sparkles,
  GitPullRequest,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  Search,
  ChevronDown,
  ChevronUp,
  // Terminal,
  // ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  // ExternalLink,
  // Users,
  // Code,
  // BookOpen,
  // Cpu,
  // BarChart3,
  // Lock,
  GitBranch,
  RefreshCw,
  // Sliders,
  // Send,
  X
} from "lucide-react";

const QUICK_TEMPLATES = [
  {
    label: "One-Click Checkout with Apple Pay",
    type: "PRD",
    prompt: "Design a frictionless guest checkout experience integrating Apple Pay, Google Pay, and Stripe auto-reconciliation with fallback tokenization."
  },
  {
    label: "Distributed Webhook Dispatcher",
    type: "TECH_SPEC",
    prompt: "Architecture specification for a fault-tolerant webhook delivery queue handling 50k events/sec using Redis Streams and Go workers with backoff retries."
  },
  {
    label: "P0 Database Failover Runbook",
    type: "SOP",
    prompt: "Zero-downtime PostgreSQL primary-to-replica failover execution runbook during an AWS Availability Zone degradation."
  }
];

const GENERATED_SPEC_LIBRARY = {
  PRD: {
    title: "PRD: One-Click Express Checkout & Native Biometrics",
    meta: "Author: AI Co-Pilot & Sarah Lin (VP Prod) • Status: Ready for Review • Drift: 0%",
    content: `## 1. Problem Statement & Motivation
Users currently experience a 28% drop-off during Step 3 of checkout due to redundant address confirmation fields. By introducing one-touch biometric checkout (Apple Pay / Google Pay) with pre-filled saved logistics, checkout completion latency can drop from 84s to under 12s.

## 2. Core User Stories & Acceptance Criteria
- **US-101 [Guest Users]:** As a returning guest, I can authorize payments via Passkey or Apple Pay without manual credit card input.
  - *AC-1:* Tokenized payload returned by payment sheet must validate against Stripe v2 endpoints in under 450ms.
  - *AC-2:* Shipping addresses must auto-validate against SmartyStreets postal cleansing API before charging.
- **US-102 [Edge Case - Network Partition]:** If webhook acknowledgment times out, the client falls back to idempotency-keyed polling with an exponential backoff.

## 3. Success Metrics & Guardrails
- **Primary KPI:** Conversion lift on mobile web by +14.8%.
- **Latency Budget:** Total roundtrip authorization latency <= 600ms (p95).
- **Traceability:** Correlated with Jira Epic #PAY-892 and GitHub PR #312.`
  },
  TECH_SPEC: {
    title: "Tech Spec: Resilient Distributed Webhook Dispatcher",
    meta: "Author: Staff Infra Eng • Reviewer: Principal Arch • Target Deploy: Q3 Sprint 2",
    content: `## 1. Architectural Overview
This system provides high-throughput delivery guarantees (at-least-once) for outgoing tenant webhooks, mitigating noisy neighbor starvation using partitioned Redis Streams.

\`\`\`mermaid
flowchart LR
    Ingest[API Gateway / Event Bus] --> Broker[(Redis Stream Ring)]
    Broker --> WorkerPool[Go Worker Daemon Set]
    WorkerPool --> CircuitBreaker{CB: Host Health}
    CircuitBreaker -->|Healthy| Target[Customer Webhook URL]
    CircuitBreaker -->|Failing| DLQ[(Exponential Dead Letter Queue)]
\`\`\`

## 2. Delivery Guarantees & Concurrency
- **Partitioning Strategy:** Hash-slot by tenant ID modulo 64 shards.
- **Backoff Algorithm:** Exponential backoff \`t = base * 2^attempt\` capped at 30 minutes with 10% jitter.
- **Security:** HMAC-SHA256 signature generated in header \`X-Editorial-Signature\` using rotational secrets.`
  },
  SOP: {
    title: "Incident SOP: AWS AZ Failover & Read-Replica Promotion",
    meta: "Severity: P0 / Critical • System: RDS Aurora Multi-AZ • Sign-off: Lead SRE",
    content: `## 1. Immediate Pre-Flight Checklist
- [x] Verify split-brain safeguard by querying active cluster leader: \`SELECT aurora_db_instance_identifier();\`
- [x] Announce maintenance window on Slack channel #incidents-prod.
- [ ] Freeze background queue ingestion workers: \`kubectl scale deployment/webhook-workers --replicas=0\`

## 2. Promotion Protocol
1. Execute Aurora replica switchover via AWS CLI:
   \`aws rds failover-db-cluster --db-cluster-identifier prod-cluster-us-east-1\`
2. Verify connection pooling re-resolution through PgBouncer:
   \`SHOW POOLS;\` (Ensure pending client queues resolve within 30 seconds)
3. Unfreeze workers and monitor error budget burn rate on Datadog board #9112.`
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [billingCycle, setBillingCycle] = useState("annual"); // "monthly" | "annual"
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#121212] font-sans antialiased selection:bg-neutral-900 selection:text-white flex flex-col justify-between">
      {/* Top Banner */}
      {!bannerDismissed && (
        <div className="relative bg-neutral-950 px-4 py-2 text-center text-xs font-medium text-neutral-300 flex items-center justify-center gap-2 border-b border-neutral-800">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            v2.4 Live
          </span>
          <span className="truncate max-w-70 sm:max-w-none">
            Multi-Agent PRD Synthesis & Bi-directional GitHub Sync are now GA.
          </span>
          <button
            onClick={() => setCurrentPage("modules")}
            className="underline hover:text-white transition cursor-pointer font-semibold ml-1 text-xs"
          >
            Learn more &rarr;
          </button>
          <button
            onClick={() => setBannerDismissed(true)}
            className="absolute right-3 top-2 text-neutral-400 hover:text-white p-0.5 rounded cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Sticky Global Navbar */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-[#fafaf9]/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-3.5">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => {
                setCurrentPage("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group flex items-center gap-2.5 text-left cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-950 text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
                <span className="font-mono text-sm font-bold tracking-tighter">E</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-neutral-950">
                Editorial<span className="text-neutral-400 font-normal">.io</span>
              </span>
            </button>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-neutral-600">
              <button
                onClick={() => setCurrentPage("home")}
                className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                  currentPage === "home"
                    ? "bg-neutral-200/70 text-neutral-950 font-semibold"
                    : "hover:bg-neutral-100 hover:text-neutral-950"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setCurrentPage("modules")}
                className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                  currentPage === "modules"
                    ? "bg-neutral-200/70 text-neutral-950 font-semibold"
                    : "hover:bg-neutral-100 hover:text-neutral-950"
                }`}
              >
                Product Engines
              </button>
              <button
                onClick={() => setCurrentPage("playground")}
                className={`px-3 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
                  currentPage === "playground"
                    ? "bg-neutral-200/70 text-neutral-950 font-semibold"
                    : "hover:bg-neutral-100 hover:text-neutral-950"
                }`}
              >
                <Sparkles size={13} className="text-neutral-700" />
                <span>AI Playground</span>
              </button>
              <button
                onClick={() => setCurrentPage("teams")}
                className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                  currentPage === "teams"
                    ? "bg-neutral-200/70 text-neutral-950 font-semibold"
                    : "hover:bg-neutral-100 hover:text-neutral-950"
                }`}
              >
                Solutions
              </button>
              <button
                onClick={() => setCurrentPage("pricing")}
                className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                  currentPage === "pricing"
                    ? "bg-neutral-200/70 text-neutral-950 font-semibold"
                    : "hover:bg-neutral-100 hover:text-neutral-950"
                }`}
              >
                Pricing
              </button>
            </nav>
          </div>

          {/* Nav Right CTA */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden lg:flex items-center gap-2 rounded-lg border border-neutral-200 bg-white/80 px-2.5 py-1.5 text-xs text-neutral-500 hover:border-neutral-300 hover:text-neutral-800 transition cursor-pointer shadow-2xs"
            >
              <Search size={13} />
              <span>Search docs...</span>
              <kbd className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-mono text-neutral-600 border border-neutral-200">
                ⌘ K
              </kbd>
            </button>

            <button
              onClick={() => setCurrentPage("pricing")}
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 px-2 sm:px-3 py-1.5 cursor-pointer hidden sm:block"
            >
              Sign In
            </button>

            <button
              onClick={() => {
                setCurrentPage("playground");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-950 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-neutral-800 transition active:scale-95 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </header>

      {/* Command Palette Modal Simulation */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-neutral-950/40 backdrop-blur-xs px-4">
          <div className="w-full max-w-lg rounded-xl border border-neutral-200 bg-white p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
              <Search size={16} className="text-neutral-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search specs, architecture diagrams, SOP runbooks, or jump to page..."
                className="w-full text-sm outline-hidden text-neutral-900 placeholder:text-neutral-400"
              />
              <button
                onClick={() => setCommandPaletteOpen(false)}
                className="rounded px-1.5 py-0.5 text-[11px] font-mono bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
              >
                ESC
              </button>
            </div>
            <div className="mt-3 space-y-1 text-xs">
              <div className="px-2 py-1 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                Quick Navigation
              </div>
              <button
                onClick={() => {
                  setCurrentPage("playground");
                  setCommandPaletteOpen(false);
                }}
                className="w-full text-left px-2.5 py-2 rounded-md hover:bg-neutral-100 flex items-center justify-between text-neutral-800 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={14} className="text-purple-600" /> Launch AI Document Synthesizer
                </span>
                <span className="text-neutral-400 text-[11px] font-mono">Jump</span>
              </button>
              <button
                onClick={() => {
                  setCurrentPage("modules");
                  setCommandPaletteOpen(false);
                }}
                className="w-full text-left px-2.5 py-2 rounded-md hover:bg-neutral-100 flex items-center justify-between text-neutral-800 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Layers size={14} className="text-blue-600" /> Explore 6 Product Engines
                </span>
                <span className="text-neutral-400 text-[11px] font-mono">Jump</span>
              </button>
              <button
                onClick={() => {
                  setCurrentPage("pricing");
                  setCommandPaletteOpen(false);
                }}
                className="w-full text-left px-2.5 py-2 rounded-md hover:bg-neutral-100 flex items-center justify-between text-neutral-800 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Zap size={14} className="text-amber-600" /> Compare Plans & Enterprise SLA
                </span>
                <span className="text-neutral-400 text-[11px] font-mono">Jump</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Routed Content */}
      <main className="flex-1">
        {currentPage === "home" && (
          <HomePage
            onNavigate={setCurrentPage}
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
          />
        )}
        {currentPage === "modules" && <ModulesPage onNavigate={setCurrentPage} />}
        {currentPage === "playground" && <PlaygroundPage onNavigate={setCurrentPage} />}
        {currentPage === "teams" && <TeamsPage onNavigate={setCurrentPage} />}
        {currentPage === "pricing" && (
          <PricingSection
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
            showHeader
            onNavigate={setCurrentPage}
          />
        )}
      </main>

      {/* Global SaaS Footer */}
      <footer className="border-t border-neutral-200 bg-white pt-16 pb-12 text-xs text-neutral-500">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 font-bold tracking-tight text-neutral-950 text-base mb-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-950 text-white font-mono text-xs">
                E
              </div>
              Editorial.io
            </div>
            <p className="max-w-xs text-neutral-600 leading-relaxed text-xs">
              The AI-native documentation system engineered for technical teams. Connects customer feedback, Jira epics, and codebases into living, verifiable specifications.
            </p>
            {/* <div className="mt-4 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono text-neutral-600">
                All cloud clusters operational (SOC-2 Type II)
              </span>
            </div> */}
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3 uppercase tracking-wider text-[11px]">
              Engines
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setCurrentPage("modules")} className="hover:text-neutral-950 cursor-pointer">
                  PRD Synthesizer
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("modules")} className="hover:text-neutral-950 cursor-pointer">
                  Living Architecture
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("modules")} className="hover:text-neutral-950 cursor-pointer">
                  SOP Runbooks
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("modules")} className="hover:text-neutral-950 cursor-pointer">
                  Vector Memory
                </button>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3 uppercase tracking-wider text-[11px]">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setCurrentPage("playground")} className="hover:text-neutral-950 cursor-pointer flex items-center gap-1">
                  <span>Live Generator</span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-mono">NEW</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("pricing")} className="hover:text-neutral-950 cursor-pointer">
                  Enterprise Tier
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("teams")} className="hover:text-neutral-950 cursor-pointer">
                  Security Whitepaper
                </button>
              </li>
              <li>
                <span className="hover:text-neutral-950 cursor-pointer">GitHub Marketplace App</span>
              </li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-3 uppercase tracking-wider text-[11px]">
              Resources
            </h4>
            <ul className="space-y-2">
              <li className="hover:text-neutral-950 cursor-pointer">Interactive Docs</li>
              <li className="hover:text-neutral-950 cursor-pointer">API Reference</li>
              <li className="hover:text-neutral-950 cursor-pointer">Compliance Trust Center</li>
              <li className="hover:text-neutral-950 cursor-pointer">Changelog & Releases</li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="col-span-2 sm:col-span-1 md:col-span-1">
            <h4 className="font-semibold text-neutral-900 mb-3 uppercase tracking-wider text-[11px]">
              Weekly Dispatch
            </h4>
            <p className="text-[11px] text-neutral-500 mb-2">
              Best practices on spec-driven development and autonomous docs.
            </p>
            <div className="flex gap-1.5">
              <input
                type="email"
                placeholder="eng-team@acme.com"
                className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-xs text-neutral-800 placeholder:text-neutral-400 outline-hidden focus:border-neutral-400"
              />
              <button className="rounded-md bg-neutral-950 px-3 py-1.5 font-medium text-white hover:bg-neutral-800 cursor-pointer text-xs">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="mx-auto max-w-7xl px-6 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-400 font-mono text-[11px]">
          <p>© {new Date().getFullYear()} Editorial Technologies Inc. Built for technical precision.</p>
          <div className="flex gap-4">
            <span className="hover:text-neutral-600 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-neutral-600 cursor-pointer">Terms of Service</span>
            {/* <span>•</span>
            <span className="hover:text-neutral-600 cursor-pointer">DPA / HIPAA</span> */}
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ onNavigate, billingCycle, setBillingCycle }) {
  // Interactive mock editor states
  const [editorDoc, setEditorDoc] = useState("prd");
  const [diffState, setDiffState] = useState("pending"); // "pending" | "accepted" | "rejected"
  const [activeTab, setActiveTab] = useState(0);

  const engineDemos = [
    {
      id: "prd",
      title: "PRD Synthesis",
      subtitle: "Turn 20 customer calls into a fully formed technical requirement document.",
      component: <PrdEngineDemo />
    },
    {
      id: "architecture",
      title: "Living Architecture",
      subtitle: "Generate dynamic Mermaid diagrams synced directly with your pull requests.",
      component: <ArchitectureDemo />
    },
    {
      id: "sop",
      title: "Interactive SOP Runbooks",
      subtitle: "Auditable step-by-step checklists that eliminate production deployment slips.",
      component: <SopDemo />
    },
    {
      id: "search",
      title: "Semantic Vector Memory",
      subtitle: "Query across repos, past post-mortems, and RFCs with sub-second retrieval.",
      component: <SearchDemo />
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Subtle dot-matrix background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e4e4e0_1px,transparent_1px)] bg-size-[20px_20px] mask-[radial-gradient(ellipse_60%_50%_at_50%_35%,#000_70%,transparent_100%)] -z-10" />

        <div className="mx-auto max-w-5xl px-6 text-center">
          {/* Badge */}
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-neutral-300/80 bg-white/90 px-3.5 py-1 text-xs font-semibold text-neutral-800 shadow-2xs backdrop-blur-xs mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Docs that write and update themselves.</span>
          </div> */}

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-950 leading-[1.04]">
            Documentation that writes itself. <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-neutral-950 via-neutral-700 to-neutral-500 bg-clip-text text-transparent">
              And never goes out of sync.
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Editorial.io ingests raw engineering notes, Slack threads, and GitHub pull requests to continuously co-author, review, and maintain verified technical specs throughout their lifecycle.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate("playground")}
              className="w-full sm:w-auto rounded-lg bg-neutral-950 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-neutral-800 transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles size={16} className="text-emerald-400" />
              <span>Try Live Document Synthesizer</span>
            </button>
            <button
              onClick={() => onNavigate("modules")}
              className="w-full sm:w-auto rounded-lg border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-800 shadow-2xs hover:bg-neutral-50 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explore Product Engines</span>
              <ArrowRight size={14} className="text-neutral-500" />
            </button>
          </div>

          {/* <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500 font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-600" /> Zero data retention for LLM training
            </span>
            <span>•</span>
            <span>SOC-2 Type II Certified</span>
            <span>•</span>
            <span>2-Minute GitHub Onboarding</span>
          </div> */}

          {/* Interactive Hero Editor Canvas */}
          <div className="mt-14 rounded-2xl border border-neutral-300/90 bg-white p-2 sm:p-3 shadow-2xl ring-1 ring-neutral-950/5">
            <div className="rounded-xl border border-neutral-200 bg-[#fafaf9] overflow-hidden text-left">
              {/* Window Titlebar */}
              <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-rose-400/80 border border-rose-500/20" />
                    <div className="h-3 w-3 rounded-full bg-amber-400/80 border border-amber-500/20" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400/80 border border-emerald-500/20" />
                  </div>
                  <span className="ml-2 font-mono text-[11px] text-neutral-500 flex items-center gap-1.5">
                    <FileText size={12} className="text-neutral-400" />
                    editorial://workspace/prd-v2-express-checkout.md
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Live Collaborators */}
                  <div className="flex -space-x-1.5 overflow-hidden items-center">
                    <span className="inline-flex h-6 w-6 rounded-full bg-amber-100 border border-white text-[10px] font-bold text-amber-800 items-center justify-center" title="Alex (PM)">
                      AL
                    </span>
                    <span className="inline-flex h-6 w-6 rounded-full bg-indigo-100 border border-white text-[10px] font-bold text-indigo-800 items-center justify-center" title="Devon (Staff Eng)">
                      DE
                    </span>
                    <span className="inline-flex h-6 w-6 rounded-full bg-emerald-100 border border-white text-[10px] font-bold text-emerald-800 items-center justify-center ring-1 ring-emerald-400" title="Editorial AI Agent">
                      AI✦
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                    <GitPullRequest size={11} /> PR #312 Synced
                  </span>
                </div>
              </div>

              {/* Editor Workspace Split View */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-110">
                {/* Left Mini Document Hierarchy Tree */}
                <div className="hidden md:block col-span-3 border-r border-neutral-200 bg-white p-3 text-xs font-mono">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-2 px-2">
                    Active Specs
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => setEditorDoc("prd")}
                      className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between transition cursor-pointer ${
                        editorDoc === "prd"
                          ? "bg-neutral-100 font-semibold text-neutral-950"
                          : "text-neutral-500 hover:text-neutral-900"
                      }`}
                    >
                      <span className="truncate flex items-center gap-1.5">
                        <FileText size={12} className="text-blue-500" /> Checkout Express v2
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </button>
                    <button
                      onClick={() => setEditorDoc("arch")}
                      className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between transition cursor-pointer ${
                        editorDoc === "arch"
                          ? "bg-neutral-100 font-semibold text-neutral-950"
                          : "text-neutral-500 hover:text-neutral-900"
                      }`}
                    >
                      <span className="truncate flex items-center gap-1.5">
                        <GitBranch size={12} className="text-purple-500" /> Auth Token Pipeline
                      </span>
                      <span className="text-[10px] text-neutral-400">clean</span>
                    </button>
                    <button
                      onClick={() => setEditorDoc("sop")}
                      className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between transition cursor-pointer ${
                        editorDoc === "sop"
                          ? "bg-neutral-100 font-semibold text-neutral-950"
                          : "text-neutral-500 hover:text-neutral-900"
                      }`}
                    >
                      <span className="truncate flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-amber-500" /> P0 DB Failover Runbook
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    </button>
                  </div>

                  <div className="mt-8 border-t border-neutral-100 pt-4 px-2">
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                      Context Grounding
                    </div>
                    <div className="space-y-2 text-[11px] text-neutral-600">
                      <div className="flex items-center gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span> GitHub: main (commit 4f98a)
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span> Jira: PAY-892 Ingested
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span> 14 Customer Interviews
                      </div>
                    </div>
                  </div>
                </div>

                {/* Editor Content Area */}
                <div className="col-span-12 md:col-span-9 p-5 sm:p-7 bg-white flex flex-col justify-between">
                  <div>
                    {/* Header bar of doc */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded font-mono border border-blue-200">
                          RFC & SPECIFICATION
                        </span>
                        <span className="text-neutral-400 text-xs font-mono">
                          Last auto-verified 1m ago
                        </span>
                      </div>
                      <div className="text-xs font-mono text-neutral-500 flex items-center gap-2">
                        <span>DRI: @sarah-prod</span>
                        <span>•</span>
                        <span className="text-emerald-600 font-semibold">Ready for Eng</span>
                      </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                      RFC-409: Express Checkout & Payment Tokenization Fallback
                    </h2>

                    <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                      This specification details the transition from multi-page forms to tokenized single-click express payment handlers, mitigating drop-offs on high-friction mobile viewports.
                    </p>

                    {/* Interactive AI Diff Card */}
                    <div className="mt-5 rounded-xl border border-neutral-300 bg-neutral-50/80 p-4 transition-all shadow-xs">
                      <div className="flex items-center justify-between text-xs font-semibold text-neutral-800 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Sparkles size={14} className="text-emerald-600" />
                          <span>AI Co-Pilot Ingested Diff Suggestion</span>
                        </span>
                        <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-neutral-200 text-neutral-500">
                          Source: Gong Recording #840
                        </span>
                      </div>

                      {diffState === "pending" && (
                        <div>
                          <div className="rounded bg-rose-50 border border-rose-200/80 p-2.5 text-xs text-rose-800 line-through mb-2 font-mono">
                            - Require users to verify SMS OTP before receiving payment authorization status.
                          </div>
                          <div className="rounded bg-emerald-50 border border-emerald-200/80 p-2.5 text-xs text-emerald-900 font-mono">
                            + Defer phone OTP until after biometric authorization completes to reduce drop-off by 18%.
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-[11px] text-neutral-500">
                              Try clicking an action below:
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setDiffState("rejected")}
                                className="rounded px-2.5 py-1 text-xs font-medium text-neutral-600 bg-white border border-neutral-300 hover:bg-neutral-100 cursor-pointer"
                              >
                                Reject (Esc)
                              </button>
                              <button
                                onClick={() => setDiffState("accepted")}
                                className="rounded px-3 py-1 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 cursor-pointer flex items-center gap-1"
                              >
                                <Check size={12} />
                                Accept Diff (Tab)
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {diffState === "accepted" && (
                        <div className="rounded bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-900 flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-emerald-600" />
                            <strong>Diff Accepted:</strong> Spec was updated and re-verified against code schema.
                          </span>
                          <button
                            onClick={() => setDiffState("pending")}
                            className="text-[11px] underline text-emerald-800 hover:text-emerald-950 cursor-pointer font-mono"
                          >
                            Reset demo
                          </button>
                        </div>
                      )}

                      {diffState === "rejected" && (
                        <div className="rounded bg-neutral-100 border border-neutral-200 p-3 text-xs text-neutral-600 flex items-center justify-between">
                          <span>Diff was dismissed. Original wording preserved.</span>
                          <button
                            onClick={() => setDiffState("pending")}
                            className="text-[11px] underline text-neutral-900 hover:text-black cursor-pointer font-mono"
                          >
                            Reset demo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Editor Bottom Bar */}
                  <div className="mt-6 border-t border-neutral-100 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500 font-mono">
                    <div className="flex items-center gap-3">
                      <span>WORDS: 1,482</span>
                      <span>READABILITY: Grade 10</span>
                      <span className="text-emerald-600 font-semibold">DRIFT SCORE: 0.00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigate("playground")}
                        className="text-neutral-900 font-semibold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        Open in Full Generator &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Metrics */}
      <section className="border-y border-neutral-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-8">
            Trusted by engineering and product leaders building high-leverage software
          </p>

          {/* Clean Stylized SVG Logos */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center text-center">
            <div className="flex items-center justify-center gap-2 font-mono font-bold text-neutral-400 hover:text-neutral-900 transition">
              <span className="text-base tracking-tighter">▲ VERCEL</span>
            </div>
            <div className="flex items-center justify-center gap-2 font-mono font-bold text-neutral-400 hover:text-neutral-900 transition">
              <span className="text-base tracking-tighter">⚡ SUPABASE</span>
            </div>
            <div className="flex items-center justify-center gap-2 font-mono font-bold text-neutral-400 hover:text-neutral-900 transition">
              <span className="text-base tracking-tighter">⌘ RAYCAST</span>
            </div>
            <div className="flex items-center justify-center gap-2 font-mono font-bold text-neutral-400 hover:text-neutral-900 transition">
              <span className="text-base tracking-tighter">◼ LINEAR</span>
            </div>
            <div className="flex items-center justify-center gap-2 font-mono font-bold text-neutral-400 hover:text-neutral-900 transition">
              <span className="text-base tracking-tighter">◆ RETOOL</span>
            </div>
          </div>

          {/* Hard Quant Metrics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-neutral-100 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">4.2x</div>
              <div className="text-xs text-neutral-500 mt-1 font-medium">Faster PRD Review-to-Code</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">85%</div>
              <div className="text-xs text-neutral-500 mt-1 font-medium">Reduction in Stale Wiki Drift</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">120k+</div>
              <div className="text-xs text-neutral-500 mt-1 font-medium">Specs Auto-Synced with PRs</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">99.99%</div>
              <div className="text-xs text-neutral-500 mt-1 font-medium">Enterprise Cloud Uptime SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Engine Sandbox Showcase */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Autonomous Infrastructure</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 mt-1">
              Engineered for the realities of modern product engineering.
            </h2>
            <p className="mt-3 text-sm text-neutral-600">
              Select an engine below to inspect how Editorial.io prevents knowledge decay across every stage.
            </p>
          </div>

          {/* Engine Selector Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-4">
            {engineDemos.map((engine, idx) => (
              <button
                key={engine.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
                  activeTab === idx
                    ? "bg-neutral-950 text-white shadow-xs"
                    : "text-neutral-600 hover:bg-neutral-200/60"
                }`}
              >
                <span>{engine.title}</span>
              </button>
            ))}
          </div>

          {/* Active Engine Viewport */}
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-neutral-950">{engineDemos[activeTab].title}</h3>
                <p className="text-xs text-neutral-500 mt-1">{engineDemos[activeTab].subtitle}</p>
              </div>
              <button
                onClick={() => onNavigate("playground")}
                className="text-xs font-semibold text-neutral-900 hover:underline cursor-pointer flex items-center gap-1 self-start sm:self-auto"
              >
                Try in Playground &rarr;
              </button>
            </div>

            {/* Embedded Interactive Engine Component */}
            {engineDemos[activeTab].component}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <PricingSection
        billingCycle={billingCycle}
        setBillingCycle={setBillingCycle}
        showHeader={false}
        onNavigate={onNavigate}
      />

      {/* Testimonials / Wall of Love */}
      <section className="py-20 bg-white border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Tested in Production</span>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950 mt-1">Loved by engineering and product leaders</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote: "Before Editorial.io, our Confluence was a graveyard of outdated PRDs that engineers ignored. Now, every PR is verified against living specs before merging.",
                author: "Elena Rostova",
                role: "VP of Product, FinScale",
                metric: "72% faster onboarding"
              },
              {
                quote: "The GitHub schema drift alerts caught three breaking API mismatches in our microservices last month alone. It pays for itself multiple times over.",
                author: "Marcus Vance",
                role: "Staff Infrastructure Engineer, Monolith",
                metric: "Zero schema outages"
              },
              {
                quote: "The interactive SOP runbooks completely revolutionized our on-call rotations. Every step is signed off and logged directly into our compliance trail.",
                author: "Priya Nair",
                role: "Head of Technical Operations, CloudFleet",
                metric: "100% audit pass rate"
              }
            ].map((t, i) => (
              <div key={i} className="flex flex-col justify-between rounded-xl border border-neutral-200 p-6 bg-[#fafaf9]">
                <p className="text-xs text-neutral-700 leading-relaxed italic">"{t.quote}"</p>
                <div className="mt-6 pt-4 border-t border-neutral-200/80 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-neutral-950">{t.author}</h4>
                    <p className="text-[11px] text-neutral-500">{t.role}</p>
                  </div>
                  <span className="text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                    {t.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Bottom Conversion Banner */}
      <section className="py-20 bg-[#fafaf9]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl bg-neutral-950 p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] bg-size-[20px_20px] opacity-40" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3 py-1 text-xs text-neutral-300 font-mono mb-4">
                ✦ Enterprise-Ready Infrastructure
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                Turn your fragmented wikis into verified living code.
              </h2>
              <p className="mt-4 text-xs sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
                Connect your first repository in under 2 minutes. Free 14-day trial with full PRD generation and zero data training.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => onNavigate("playground")}
                  className="rounded-lg bg-white px-6 py-3.5 text-xs sm:text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200 cursor-pointer shadow-md"
                >
                  Start 14-Day Free Trial
                </button>
                <button
                  onClick={() => onNavigate("pricing")}
                  className="rounded-lg border border-neutral-700 bg-neutral-900 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-neutral-800 cursor-pointer"
                >
                  Talk with Solutions Architect
                </button>
              </div>
              <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-neutral-500 font-mono">
                <span>✓ SOC-2 Type II</span>
                <span>•</span>
                <span>✓ No credit card required</span>
                <span>•</span>
                <span>✓ Self-host or Cloud</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ModulesPage({ onNavigate }) {
  const modules = [
    {
      title: "PRD Synthesis Engine",
      badge: "Product Teams",
      desc: "Turn messy user interviews, Slack threads, and Jira epics into verified Product Requirement Documents with full requirement traceability.",
      features: [
        "Automated User Stories with Gherkin Acceptance Criteria",
        "Source Grounding to Gong/Zoom audio transcripts",
        "Stakeholder Sign-Off Matrix with Approval Locks",
        "Jira & Linear bi-directional issue linking"
      ],
      badgeStyle: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      title: "Living Architecture Engine",
      badge: "Engineering Teams",
      desc: "Continuously parses your GitHub/GitLab repositories to generate and maintain Mermaid architecture, API routes, and schema diagrams.",
      features: [
        "Automated OpenAPI & GraphQL schema drift detection",
        "Real-time Mermaid sequence & entity relationship diagrams",
        "Pull Request gate checks: Block merge if docs drift",
        "Code-adjacent Markdown synchronization"
      ],
      badgeStyle: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
      title: "Interactive SOP Runbooks",
      badge: "DevOps & Operations",
      desc: "Convert static PDF operations manuals into live, auditable runbooks with integrated terminal commands and verification gates.",
      features: [
        "Step-by-step interactive checkboxes with state memory",
        "Audit trail logs for SOC-2 & ISO 27001 compliance",
        "CLI integration snippets with parameterized variables",
        "On-call PagerDuty escalation trigger gates"
      ],
      badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      title: "Executive Synthesis & Strategy",
      badge: "Leadership & Founders",
      desc: "Consolidate investor updates, product metrics, and market research into structured executive memos with automatic citation trees.",
      features: [
        "Cross-functional synthesis from Product, Sales, and Support",
        "Fact-checking engine that cites internal source notes",
        "Export to PDF, Markdown, Notion, and Confluence",
        "Automated weekly progress roll-ups"
      ],
      badgeStyle: "bg-amber-50 text-amber-700 border-amber-200"
    },
    {
      title: "Semantic Vector Knowledge Base",
      badge: "Enterprise Memory",
      desc: "A centralized, searchable embedding layer that prevents company amnesia when teammates depart or projects rotate.",
      features: [
        "Sub-100ms vector semantic search across all artifacts",
        "Automated warnings when drafts duplicate past work",
        "Entity resolution across microservices and team names",
        "Strict role-based access control (RBAC) boundaries"
      ],
      badgeStyle: "bg-rose-50 text-rose-700 border-rose-200"
    },
    {
      title: "Governance & Privacy Guardrails",
      badge: "Security & Legal",
      desc: "Zero-retention architecture that automatically scrubs secrets, API keys, and PII from generated documents before publish.",
      features: [
        "Automated API token, password, and PII regex masking",
        "Air-gapped deployment option for AWS VPC & GovCloud",
        "Comprehensive changelog and audit diff tracking",
        "Zero data retention guarantees with OpenAI and Anthropic"
      ],
      badgeStyle: "bg-neutral-100 text-neutral-800 border-neutral-300"
    }
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Modular Spec Infrastructure</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 mt-1">
          Six Specialized Engines. One Unified Brain.
        </h1>
        <p className="mt-4 text-base text-neutral-600 leading-relaxed">
          Editorial.io is not a generic text editor. Each module is specifically tuned to an engineering or product lifecycle phase, sharing a verified institutional memory.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((m, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-7 shadow-xs hover:border-neutral-400 transition"
          >
            <div>
              <span className={`inline-block rounded-md border px-2.5 py-0.5 text-[11px] font-bold mb-3 ${m.badgeStyle}`}>
                {m.badge}
              </span>
              <h3 className="text-lg font-bold text-neutral-950 tracking-tight">{m.title}</h3>
              <p className="mt-2.5 text-xs text-neutral-600 leading-relaxed">{m.desc}</p>
            </div>

            <div className="mt-6 border-t border-neutral-100 pt-4">
              <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">
                Key Engine Capabilities
              </p>
              <ul className="space-y-2 text-xs text-neutral-700">
                {m.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button
          onClick={() => onNavigate("playground")}
          className="rounded-lg bg-neutral-950 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-neutral-800 transition cursor-pointer"
        >
          Test the Engines in Real-time Playground &rarr;
        </button>
      </div>
    </div>
  );
}

function PlaygroundPage({ onNavigate }) {
  const [docType, setDocType] = useState("PRD");
  const [promptText, setPromptText] = useState(QUICK_TEMPLATES[0].prompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeOutput, setActiveOutput] = useState(GENERATED_SPEC_LIBRARY.PRD);
  const [copied, setCopied] = useState(false);

  const handleSelectTemplate = (template) => {
    setDocType(template.type);
    setPromptText(template.prompt);
    setActiveOutput(GENERATED_SPEC_LIBRARY[template.type]);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setActiveOutput(GENERATED_SPEC_LIBRARY[docType]);
      setIsGenerating(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeOutput.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Playground Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        {/* <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 text-xs font-semibold">
          <Sparkles size={12} className="text-emerald-600" />
          Interactive Demo
        </span> */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 mt-2">
          Experience Live Spec Generation
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-neutral-600">
          Pick a template or write an engineering prompt to observe how Editorial formats, structures, and cites technical requirements.
        </p>
      </div>

      {/* Main Interactive Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Control Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              1. Document Architecture Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "PRD", label: "Product PRD" },
                { id: "TECH_SPEC", label: "Tech Spec" },
                { id: "SOP", label: "Incident SOP" }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setDocType(t.id);
                    setActiveOutput(GENERATED_SPEC_LIBRARY[t.id]);
                  }}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border transition cursor-pointer text-center ${
                    docType === t.id
                      ? "bg-neutral-950 text-white border-neutral-950"
                      : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              2. Quick Presets
            </label>
            <div className="space-y-1.5">
              {QUICK_TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectTemplate(tmpl)}
                  className="w-full text-left p-2 rounded-lg border border-neutral-200 text-xs hover:border-neutral-400 bg-neutral-50/50 hover:bg-neutral-100 transition cursor-pointer"
                >
                  <span className="font-semibold text-neutral-900 block">{tmpl.label}</span>
                  <span className="text-[10px] text-neutral-500 font-mono">{tmpl.type}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              3. Requirements Prompt & Context
            </label>
            <textarea
              rows={4}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 p-3 text-xs text-neutral-900 focus:border-neutral-900 outline-hidden font-mono leading-relaxed"
              placeholder="Describe requirements, acceptance criteria, or architectural dependencies..."
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full rounded-lg bg-neutral-950 py-3 text-xs font-semibold text-white shadow-xs hover:bg-neutral-800 transition cursor-pointer flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>Synthesizing Document with LLM...</span>
              </>
            ) : (
              <>
                <Sparkles size={14} className="text-emerald-400" />
                <span>Generate Verified Spec</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output Viewer */}
        <div className="lg:col-span-7 rounded-2xl border border-neutral-200 bg-white shadow-xs overflow-hidden">
          <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-neutral-500" />
              <span className="font-mono text-xs font-semibold text-neutral-700">
                {activeOutput.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs font-medium text-neutral-600 hover:text-neutral-950 bg-white border border-neutral-200 px-2.5 py-1 rounded shadow-2xs cursor-pointer"
              >
                {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copied ? "Copied" : "Copy Markdown"}</span>
              </button>
            </div>
          </div>

          {/* Doc Meta Strip */}
          <div className="px-5 py-2.5 bg-neutral-100/60 border-b border-neutral-200 text-[11px] font-mono text-neutral-500">
            {activeOutput.meta}
          </div>

          {/* Rendered Output Content */}
          <div className="p-6 font-mono text-xs leading-relaxed text-neutral-800 whitespace-pre-wrap max-h-130 overflow-y-auto">
            {activeOutput.content}
          </div>

          <div className="border-t border-neutral-100 bg-[#fafaf9] px-6 py-3 flex items-center justify-between text-[11px] text-neutral-500">
            <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <CheckCircle2 size={13} /> Verified against Git HEAD commit
            </span>
            <button
              onClick={() => onNavigate("pricing")}
              className="text-neutral-900 font-semibold hover:underline cursor-pointer"
            >
              Export to your workspace &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamsPage({ onNavigate }) {
  const audiences = [
    {
      role: "Product Managers",
      metric: "Save ~8 hrs / week",
      value: "Synthesize user interviews, Gong recordings, and competitor briefs directly into structured PRDs with zero blank-page anxiety.",
      tags: ["User Stories", "Acceptance Criteria", "Jira Linking"]
    },
    {
      role: "Engineering Leads",
      metric: "0% Schema Drift",
      value: "Sync technical architecture with code reality. PR gates flag outdated markdown diagrams before breaking changes reach production.",
      tags: ["Mermaid Diagrams", "OpenAPI Sync", "CI/CD Gates"]
    },
    {
      role: "Technical Writers",
      metric: "Standardized Tone",
      value: "Automate terminology audits, style-guide governance, and version-controlled release documentation across all engineering squads.",
      tags: ["Style Enforcement", "Glossary Sync", "Multi-repo Docs"]
    },
    {
      role: "DevOps & SRE Leads",
      metric: "100% Audit Readiness",
      value: "Build interactive runbooks for zero-downtime DB migrations, disaster recovery, and incident escalations with signed execution logs.",
      tags: ["Interactive Checklists", "Audit History", "PagerDuty"]
    },
    {
      role: "Startup Founders",
      metric: "Ship 3x Faster",
      value: "Convert loose vision notes and investor questions into crisp specs so remote engineers can execute autonomously without endless meetings.",
      tags: ["Fast Scoping", "Lean Roadmaps", "Context Retention"]
    },
    {
      role: "Security & Compliance",
      metric: "Zero Data Leakage",
      value: "Self-host in your own AWS/GCP VPC. Strict zero-retention agreements prevent private intellectual property from training third-party LLMs.",
      tags: ["SOC-2 Type II", "VPC Air-Gap", "PII Scrubbing"]
    }
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Target Solutions</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 mt-1">
          Built For The Technical Organization
        </h1>
        <p className="mt-4 text-base text-neutral-600 leading-relaxed">
          From fast-paced pre-Series A startups to enterprise platforms with hundreds of engineers, Editorial.io bridges the gap between idea, spec, and codebase.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {audiences.map((aud, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-7 shadow-xs hover:border-neutral-300 transition"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-neutral-950">{aud.role}</h3>
                <span className="text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                  {aud.metric}
                </span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">{aud.value}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap gap-1.5">
              {aud.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-mono text-neutral-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-neutral-950 p-10 sm:p-14 text-center text-white">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">Need a custom enterprise rollout?</h2>
        <p className="mt-4 text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
          We offer on-premise VPC deployments, private LLM fine-tuning on your private repos, and dedicated customer success architects.
        </p>
        <button
          onClick={() => onNavigate("pricing")}
          className="mt-6 rounded-lg bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200 cursor-pointer shadow-md"
        >
          Book Technical Architecture Review
        </button>
      </div>
    </div>
  );
}

function PrdEngineDemo() {
  return (
    <div className="grid md:grid-cols-12 gap-6 items-center">
      <div className="md:col-span-6 space-y-4">
        <span className="inline-block rounded-md bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 text-xs font-semibold">
          Source-to-Spec Ingestion
        </span>
        <h4 className="text-xl font-bold text-neutral-900">
          Never write requirements from a blank page again.
        </h4>
        <p className="text-xs text-neutral-600 leading-relaxed">
          Connect your Gong recordings, customer Slack channels, and Jira tickets. Editorial.io extracts verified user stories, edge cases, and technical dependencies in structured Markdown.
        </p>
        <ul className="space-y-1.5 text-xs text-neutral-700">
          <li className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-emerald-600" />
            <span>Traceable citations linked to original raw customer quotes.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-emerald-600" />
            <span>Automatic acceptance criteria generated in Gherkin syntax.</span>
          </li>
        </ul>
      </div>

      <div className="md:col-span-6 bg-neutral-900 rounded-xl p-5 text-neutral-200 font-mono text-xs shadow-inner">
        <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-800 pb-2 mb-3">
          <span>ingest://slack-thread-checkout-bugs.json</span>
          <span className="text-emerald-400 text-[10px]">PARSED</span>
        </div>
        <p className="text-neutral-400 text-[11px] mb-2">// Extracted User Story #14:</p>
        <p className="text-emerald-400 text-[11px]">
          Scenario: Tokenization retry on transient network fault
        </p>
        <p className="text-neutral-300 text-[11px] pl-2">
          Given a buyer with 3DS-enrolled card<br />
          When the payment gateway returns HTTP 503<br />
          Then retry once with idempotency key before surfacing UI prompt
        </p>
      </div>
    </div>
  );
}

function ArchitectureDemo() {
  return (
    <div className="grid md:grid-cols-12 gap-6 items-center">
      <div className="md:col-span-6 space-y-4">
        <span className="inline-block rounded-md bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-0.5 text-xs font-semibold">
          Dynamic Mermaid Sync
        </span>
        <h4 className="text-xl font-bold text-neutral-900">
          Diagrams that reflect your code, not your intentions.
        </h4>
        <p className="text-xs text-neutral-600 leading-relaxed">
          Static PNG diagrams become obsolete the day they are uploaded. Editorial.io continuously parses your route controllers and database schemas to render dynamic sequence flows.
        </p>
      </div>

      <div className="md:col-span-6 border border-neutral-200 rounded-xl p-5 bg-[#fafaf9]">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-2 mb-4 text-xs font-mono text-neutral-500">
          <span>MERMAID SEQUENCE FLOW</span>
          <span className="text-purple-600 font-semibold">GITHUB SYNCED</span>
        </div>
        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-neutral-900 text-white px-2 py-0.5 rounded text-[10px]">Client</span>
            <span className="text-neutral-400">&rarr; POST /v2/auth/token &rarr;</span>
            <span className="bg-neutral-200 text-neutral-800 px-2 py-0.5 rounded text-[10px]">Gateway</span>
          </div>
          <div className="flex items-center gap-2 pl-4">
            <span className="bg-neutral-200 text-neutral-800 px-2 py-0.5 rounded text-[10px]">Gateway</span>
            <span className="text-neutral-400">&rarr; JWT Sign & Cache &rarr;</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-[10px]">Redis Cache</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-neutral-200 text-neutral-800 px-2 py-0.5 rounded text-[10px]">Gateway</span>
            <span className="text-emerald-600">&larr; HTTP 200 {`{ access_token }`} &larr;</span>
            <span className="bg-neutral-900 text-white px-2 py-0.5 rounded text-[10px]">Client</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SopDemo() {
  const [items, setItems] = useState([
    { id: 1, text: "Trigger AWS Aurora Failover command via CLI", done: true },
    { id: 2, text: "Verify replica promotion in Datadog monitor #9021", done: true },
    { id: 3, text: "Drain and bounce PgBouncer connection poolers", done: false },
    { id: 4, text: "Execute post-failover smoke test on /healthz", done: false }
  ]);

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  return (
    <div className="grid md:grid-cols-12 gap-6 items-center">
      <div className="md:col-span-6 space-y-4">
        <span className="inline-block rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-xs font-semibold">
          Interactive Runbooks
        </span>
        <h4 className="text-xl font-bold text-neutral-900">
          Eliminate on-call chaos during P0 incidents.
        </h4>
        <p className="text-xs text-neutral-600 leading-relaxed">
          Standard Operating Procedures shouldn't be passive Google Docs. SRE teams use interactive checkmarks with direct terminal snippets and signed audit timestamps.
        </p>
      </div>

      <div className="md:col-span-6 rounded-xl border border-neutral-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-2 mb-3 text-xs font-mono">
          <span className="font-semibold text-neutral-800">RUNBOOK: Aurora AZ Failover</span>
          <span className="text-neutral-400">DRI: @oncall-eng</span>
        </div>
        <div className="space-y-2.5">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center gap-2.5 text-left text-xs p-2 rounded hover:bg-neutral-50 transition cursor-pointer"
            >
              {item.done ? (
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              ) : (
                <Circle size={16} className="text-neutral-300 shrink-0" />
              )}
              <span className={item.done ? "line-through text-neutral-400" : "text-neutral-800"}>
                {item.text}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-500">
          Completed {items.filter((i) => i.done).length} of {items.length} steps (State signed to SOC-2 log)
        </div>
      </div>
    </div>
  );
}

function SearchDemo() {
  const [query, setQuery] = useState("payment retry logic");

  return (
    <div className="grid md:grid-cols-12 gap-6 items-center">
      <div className="md:col-span-6 space-y-4">
        <span className="inline-block rounded-md bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 text-xs font-semibold">
          Vector Institutional Memory
        </span>
        <h4 className="text-xl font-bold text-neutral-900">
          Instant answers across 5 years of engineering history.
        </h4>
        <p className="text-xs text-neutral-600 leading-relaxed">
          Ask questions in natural language. Editorial.io queries embeddings across merged PRs, retired RFCs, and past incident post-mortems to cite the exact historical rationale.
        </p>
      </div>

      <div className="md:col-span-6 rounded-xl border border-neutral-200 bg-white p-5 shadow-xs">
        <div className="relative mb-3">
          <Search size={14} className="absolute left-3 top-3 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 pl-8 pr-3 py-2 text-xs font-mono text-neutral-800 outline-hidden"
            placeholder="Search across all historical specs..."
          />
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200">
            <span className="text-[10px] font-mono text-purple-600 font-bold block mb-1">
              RFC-112 (Author: @dave-core • Merged Mar 2024)
            </span>
            <p className="text-neutral-700 text-xs">
              "...Idempotency headers are validated against a 24-hour Redis TTL to avoid double-charging transient card drops."
            </p>
          </div>
          <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200">
            <span className="text-[10px] font-mono text-blue-600 font-bold block mb-1">
              POST-MORTEM #402 (Incident Lead: @maya)
            </span>
            <p className="text-neutral-700 text-xs">
              "...Stripe webhook timeouts reached 3,000 req/min when exponential backoff was missing jitter."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingSection({ billingCycle, setBillingCycle, showHeader = false, onNavigate }) {
  const plans = [
    {
      name: "Starter",
      desc: "For small squads standardizing their first engineering specs.",
      monthlyPrice: 19,
      annualPrice: 15,
      features: [
        "Up to 5 team members",
        "PRD & SOP generation engines",
        "GitHub repository read sync",
        "Standard Markdown & PDF exports",
        "Community Discord support"
      ],
      cta: "Start 14-Day Trial",
      popular: false
    },
    {
      name: "Team",
      desc: "For fast-scaling engineering squads requiring live sync & approval gates.",
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        "Up to 25 team members",
        "All 6 specialized generation engines",
        "Bi-directional GitHub & GitLab sync",
        "Schema drift PR gate checks",
        "Multi-stakeholder sign-off workflows",
        "Priority Slack support & SLA"
      ],
      cta: "Start 14-Day Trial",
      popular: true
    },
    {
      name: "Enterprise",
      desc: "For security-conscious organizations demanding dedicated VPC and compliance.",
      monthlyPrice: "Custom",
      annualPrice: "Custom",
      features: [
        "Unlimited seats",
        "Private VPC deployment (AWS / GCP)",
        "Zero data retention LLM agreements",
        "SSO via Okta, Azure AD, SAML 2.0",
        "Full SOC-2 Type II audit package",
        "Dedicated Solutions Architect"
      ],
      cta: "Contact Enterprise Sales",
      popular: false
    }
  ];

  return (
    <section className="py-20 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {showHeader && (
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Transparent Pricing
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 mt-1">
            Predictable investment for high-velocity teams.
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            Every plan includes our core zero-retention guarantee. Cancel or switch anytime.
          </p>

          {/* Billing Switch */}
          <div className="mt-6 inline-flex items-center rounded-lg bg-neutral-100 p-1 border border-neutral-200">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-white text-neutral-950 shadow-2xs"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                billingCycle === "annual"
                  ? "bg-white text-neutral-950 shadow-2xs"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <span>Annual billing</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-8 flex flex-col justify-between relative transition duration-200 ${
                p.popular
                  ? "border-neutral-950 bg-white shadow-xl ring-2 ring-neutral-950"
                  : "border-neutral-200 bg-neutral-50/50 hover:border-neutral-300"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neutral-950 px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                  Recommended for Startups
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-neutral-950">{p.name}</h3>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">{p.desc}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  {typeof p.monthlyPrice === "number" ? (
                    <>
                      <span className="text-4xl font-extrabold tracking-tight text-neutral-950">
                        ${billingCycle === "annual" ? p.annualPrice : p.monthlyPrice}
                      </span>
                      <span className="text-xs text-neutral-500 font-medium">/ user / mo</span>
                    </>
                  ) : (
                    <span className="text-3xl font-extrabold tracking-tight text-neutral-950">
                      Custom
                    </span>
                  )}
                </div>

                <div className="mt-6 border-t border-neutral-200 pt-6">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                    Features included
                  </div>
                  <ul className="space-y-2.5 text-xs text-neutral-700">
                    {p.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => onNavigate("playground")}
                  className={`w-full rounded-lg py-3 text-xs font-semibold transition cursor-pointer active:scale-98 ${
                    p.popular
                      ? "bg-neutral-950 text-white hover:bg-neutral-800 shadow-sm"
                      : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100"
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "Does Editorial.io use our company codebase or PRDs to train AI models?",
      a: "No. We enforce strict zero-retention enterprise agreements with our model inference providers (Anthropic Claude and OpenAI). Your codebase, engineering notes, and customer transcripts are never saved or used for model training."
    },
    {
      q: "How does the automated GitHub/GitLab drift detection work?",
      a: "Editorial.io installs as a verified GitHub App. During continuous integration, it parses your OpenAPI schemas, GraphQL types, and database migrations. If a pull request modifies an API contract without updating its corresponding spec, a PR comment is created and can be configured as a blocking check."
    },
    {
      q: "Can we import our existing legacy docs from Notion or Confluence?",
      a: "Yes. Editorial.io includes one-click workspace importers for Notion workspaces, Confluence spaces, and GitHub Markdown directories, preserving hierarchy, embedded images, and author history."
    },
    {
      q: "Is there an on-premise or VPC self-hosted deployment option?",
      a: "Yes. For organizations with strict compliance or defense requirements, we offer an air-gapped Docker / Helm chart deployment on AWS GovCloud, Google Cloud, or Azure with local Ollama / vLLM inference."
    },
    {
      q: "What security compliance certifications do you maintain?",
      a: "Editorial.io is SOC-2 Type II certified annually, ISO 27001 compliant, GDPR compliant, and ready for HIPAA business associate agreements (BAA)."
    }
  ];

  return (
    <section className="py-20 border-t border-neutral-200 bg-[#fafaf9]">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 mt-1">
            Everything you need to know
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl border border-neutral-200 bg-white overflow-hidden shadow-2xs">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between font-semibold text-neutral-900 text-sm cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-neutral-400 ml-2">
                  {openIdx === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-4 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}