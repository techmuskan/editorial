import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, User, Building2, Mail, MessageSquare, Briefcase, Users } from 'lucide-react';
import { useReveal } from '../hooks';
import { Container, Section, SectionLabel, SectionTitle, SectionDescription, Badge, Button } from '../components/ui';

/* ─── Form input ─── */
function FormInput({ label, id, type = 'text', placeholder, required = false, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 text-sm bg-white border border-border rounded-xl focus:outline-none focus:border-accent-blue/40 focus:ring-2 focus:ring-accent-blue/10 transition-all placeholder:text-ink-faint"
      />
    </div>
  );
}

function FormTextarea({ label, id, placeholder, required = false, value, onChange, rows = 4 }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-4 py-3 text-sm bg-white border border-border rounded-xl focus:outline-none focus:border-accent-blue/40 focus:ring-2 focus:ring-accent-blue/10 transition-all placeholder:text-ink-faint resize-none"
      />
    </div>
  );
}

function FormSelect({ label, id, options, required = false, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <select
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 text-sm bg-white border border-border rounded-xl focus:outline-none focus:border-accent-blue/40 focus:ring-2 focus:ring-accent-blue/10 transition-all appearance-none cursor-pointer"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%237A7A72' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

/* ─── Success state ─── */
function SuccessMessage({ name, type }) {
  return (
    <div className="bg-accent-green/5 border border-accent-green/15 rounded-2xl p-8 text-center animate-scale-in">
      <CheckCircle2 size={36} className="text-accent-green mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {type === 'org' ? 'We\'ll be in touch.' : `You're on the list, ${name}.`}
      </h3>
      <p className="text-sm text-ink-secondary leading-relaxed max-w-md mx-auto">
        {type === 'org'
          ? 'Thank you for your interest. A member of our team will reach out within a few business days to discuss how Editorial.io can help your organization.'
          : 'We\'ll reach out when Editorial.io is ready for you. Thank you for your interest in being part of the journey.'
        }
      </p>
    </div>
  );
}


export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('individual');
  const [indSubmitted, setIndSubmitted] = useState(false);
  const [orgSubmitted, setOrgSubmitted] = useState(false);

  // Individual form state
  const [indName, setIndName] = useState('');
  const [indEmail, setIndEmail] = useState('');
  const [indUseCase, setIndUseCase] = useState('');

  // Org form state
  const [orgName, setOrgName] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [orgCompany, setOrgCompany] = useState('');
  const [orgRole, setOrgRole] = useState('');
  const [orgTeamSize, setOrgTeamSize] = useState('');
  const [orgMessage, setOrgMessage] = useState('');

  useEffect(() => {
    document.title = 'Contact & Early Access | Editorial.io';
    window.scrollTo(0, 0);
    const hash = window.location.hash;
    if (hash === '#organizations') setActiveTab('organization');
  }, []);

  const [indSubmitting, setIndSubmitting] = useState(false);
  const [orgSubmitting, setOrgSubmitting] = useState(false);

  const handleIndSubmit = async (e) => {
    e.preventDefault();
    if (!indName || !indEmail) return;
    setIndSubmitting(true);
    try {
      await fetch('https://formsubmit.co/ajax/editorial.io.hq@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: indName,
          email: indEmail,
          useCase: indUseCase || 'Not specified',
          _subject: `Individual Waitlist: ${indName}`,
          _template: 'table',
          type: 'Individual Waitlist',
        }),
      });
      setIndSubmitted(true);
    } catch {
      setIndSubmitted(true);
    }
    setIndSubmitting(false);
  };

  const handleOrgSubmit = async (e) => {
    e.preventDefault();
    if (!orgName || !orgEmail || !orgCompany) return;
    setOrgSubmitting(true);
    try {
      await fetch('https://formsubmit.co/ajax/editorial.io.hq@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: orgName,
          email: orgEmail,
          company: orgCompany,
          role: orgRole || 'Not specified',
          teamSize: orgTeamSize || 'Not specified',
          message: orgMessage || 'Not specified',
          _subject: `Organization Inquiry: ${orgCompany} (${orgName})`,
          _template: 'table',
          type: 'Organization Request',
        }),
      });
      setOrgSubmitted(true);
    } catch {
      setOrgSubmitted(true);
    }
    setOrgSubmitting(false);
  };

  const teamSizeOptions = [
    { value: '1-5', label: '1–5 people' },
    { value: '6-20', label: '6–20 people' },
    { value: '21-50', label: '21–50 people' },
    { value: '51-200', label: '51–200 people' },
    { value: '200+', label: '200+ people' },
  ];

  return (
    <main className="pt-24">
      {/* Hero */}
      <Section className="py-16 sm:py-20">
        <Container size="narrow">
          <div className="text-center">
            <SectionLabel>Contact & Early Access</SectionLabel>
            <SectionTitle className="mb-5" serif>
              Let's start a<br />
              <span className="text-ink-tertiary">conversation.</span>
            </SectionTitle>
            <SectionDescription className="mx-auto">
              Whether you're an individual looking to join the waitlist or an organization interested in exploring Editorial.io, we'd love to hear from you.
            </SectionDescription>
          </div>
        </Container>
      </Section>

      {/* Forms */}
      <Section className="pb-24 sm:pb-32">
        <Container size="narrow">
          {/* Tab switcher */}
          <div className="flex items-center gap-1 p-1 bg-surface-elevated rounded-xl border border-border-subtle mb-10 max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('individual')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer ${
                activeTab === 'individual'
                  ? 'bg-white text-foreground shadow-sm border border-border-subtle'
                  : 'text-ink-tertiary hover:text-foreground'
              }`}
            >
              <User size={15} />
              Individuals
            </button>
            <button
              onClick={() => setActiveTab('organization')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer ${
                activeTab === 'organization'
                  ? 'bg-white text-foreground shadow-sm border border-border-subtle'
                  : 'text-ink-tertiary hover:text-foreground'
              }`}
            >
              <Building2 size={15} />
              Organizations
            </button>
          </div>

          {/* Individual form */}
          <div className={`transition-all duration-500 ${activeTab === 'individual' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute pointer-events-none'}`}>
            {!indSubmitted ? (
              <div className="bg-white rounded-2xl border border-border p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-2">
                  <User size={18} className="text-accent-blue" />
                  <h3 className="text-lg font-semibold tracking-tight">Join the Early Access Waitlist</h3>
                </div>
                <p className="text-sm text-ink-secondary mb-8">
                  Sign up to be notified when Editorial.io is ready for individual users. No commitment, just an expression of interest.
                </p>

                <form onSubmit={handleIndSubmit} className="space-y-5">
                  <FormInput
                    label="Name"
                    id="ind-name"
                    placeholder="Your full name"
                    required
                    value={indName}
                    onChange={(e) => setIndName(e.target.value)}
                  />
                  <FormInput
                    label="Email"
                    id="ind-email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={indEmail}
                    onChange={(e) => setIndEmail(e.target.value)}
                  />
                  <FormTextarea
                    label="What would you like to use Editorial.io for?"
                    id="ind-usecase"
                    placeholder="E.g., writing product specs, research reports, technical documentation... (optional)"
                    value={indUseCase}
                    onChange={(e) => setIndUseCase(e.target.value)}
                    rows={3}
                  />
                  <Button type="submit" variant="primary" size="lg" disabled={indSubmitting} className="w-full mt-2">
                    {indSubmitting ? 'Joining...' : 'Join Waitlist'} <ArrowRight size={15} />
                  </Button>
                </form>

                <p className="text-xs text-muted text-center mt-4">
                  We'll only contact you about Editorial.io. No spam, ever.
                </p>
              </div>
            ) : (
              <SuccessMessage name={indName} type="ind" />
            )}
          </div>

          {/* Organization form */}
          <div className={`transition-all duration-500 ${activeTab === 'organization' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute pointer-events-none'}`}>
            {!orgSubmitted ? (
              <div className="bg-white rounded-2xl border border-border p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 size={18} className="text-accent-green" />
                  <h3 className="text-lg font-semibold tracking-tight">Talk to Our Team</h3>
                </div>
                <p className="text-sm text-ink-secondary mb-8">
                  Interested in how Editorial.io can help your organization? Share a few details and we'll schedule an introductory conversation.
                </p>

                <form onSubmit={handleOrgSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput
                      label="Your name"
                      id="org-name"
                      placeholder="Full name"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                    />
                    <FormInput
                      label="Work email"
                      id="org-email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      value={orgEmail}
                      onChange={(e) => setOrgEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput
                      label="Organization"
                      id="org-company"
                      placeholder="Company name"
                      required
                      value={orgCompany}
                      onChange={(e) => setOrgCompany(e.target.value)}
                    />
                    <FormInput
                      label="Your role"
                      id="org-role"
                      placeholder="E.g., Head of Product"
                      value={orgRole}
                      onChange={(e) => setOrgRole(e.target.value)}
                    />
                  </div>
                  <FormSelect
                    label="Team size"
                    id="org-teamsize"
                    options={teamSizeOptions}
                    value={orgTeamSize}
                    onChange={(e) => setOrgTeamSize(e.target.value)}
                  />
                  <FormTextarea
                    label="How does your team handle documentation today?"
                    id="org-message"
                    placeholder="Tell us about your current documentation workflow, pain points, or what you'd like to explore with Editorial.io..."
                    value={orgMessage}
                    onChange={(e) => setOrgMessage(e.target.value)}
                    rows={4}
                  />
                  <Button type="submit" variant="primary" size="lg" disabled={orgSubmitting} className="w-full mt-2">
                    {orgSubmitting ? 'Sending Request...' : 'Request a Conversation'} <ArrowRight size={15} />
                  </Button>
                </form>

                <p className="text-xs text-muted text-center mt-4">
                  We typically respond within 2 business days.
                </p>
              </div>
            ) : (
              <SuccessMessage name={orgName} type="org" />
            )}
          </div>
        </Container>
      </Section>

      {/* Contact info */}
      <Section className="py-16 sm:py-20 bg-cream">
        <Container size="narrow">
          <div className="text-center">
            <h3 className="text-xl font-semibold tracking-tight mb-3">Prefer email?</h3>
            <p className="text-sm text-ink-secondary mb-4">
              You can reach us directly at{' '}
              <a href="mailto:hello@editorial.io" className="text-accent-blue hover:text-accent-blue/80 font-medium transition-colors">
                hello@editorial.io
              </a>
            </p>
            <p className="text-xs text-muted">
              Editorial.io is built by{' '}
              <a href="#" className="text-ink-secondary hover:text-foreground font-medium transition-colors">
                Valispring
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
