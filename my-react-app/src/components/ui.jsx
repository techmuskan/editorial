import { useReveal } from '../hooks';

export function Section({ children, className = '', id, dark = false }) {
  const [ref, visible] = useReveal(0.08);
  return (
    <section
      ref={ref}
      id={id}
      className={`relative ${dark ? 'bg-midnight text-white' : ''} ${className}`}
    >
      <div className={`transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        {children}
      </div>
    </section>
  );
}

export function Container({ children, className = '', size = 'default' }) {
  const maxW = size === 'narrow' ? 'max-w-3xl' : size === 'wide' ? 'max-w-7xl' : 'max-w-6xl';
  return <div className={`mx-auto px-5 sm:px-8 lg:px-12 ${maxW} ${className}`}>{children}</div>;
}

export function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium tracking-wide uppercase rounded-full border border-border bg-surface text-muted-foreground ${className}`}>
      {children}
    </span>
  );
}

export function Button({ children, variant = 'primary', size = 'default', href, onClick, className = '', type = 'button', disabled = false, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-out rounded-full cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-ink text-white hover:bg-graphite active:scale-[0.98] shadow-sm hover:shadow-md',
    secondary: 'bg-surface border border-border text-foreground hover:bg-surface-elevated hover:border-muted active:scale-[0.98]',
    ghost: 'text-ink-secondary hover:text-foreground hover:bg-surface-elevated',
    outline: 'border border-border text-foreground hover:bg-surface hover:border-muted',
    accent: 'bg-accent-blue text-white hover:bg-accent-blue/90 active:scale-[0.98] shadow-sm',
  };
  const sizes = {
    sm: 'text-sm px-4 py-2 h-9',
    default: 'text-sm px-6 py-2.5 h-11',
    lg: 'text-base px-8 py-3 h-13',
  };

  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return <a href={href} className={cls} {...props}>{children}</a>;
  }
  return <button type={type} onClick={onClick} disabled={disabled} className={cls} {...props}>{children}</button>;
}

export function SectionLabel({ children, className = '' }) {
  return (
    <p className={`text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 ${className}`}>
      {children}
    </p>
  );
}

export function SectionTitle({ children, className = '', serif = false }) {
  return (
    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.1] ${serif ? 'font-serif' : ''} ${className}`}>
      {children}
    </h2>
  );
}

export function SectionDescription({ children, className = '' }) {
  return (
    <p className={`text-lg sm:text-xl text-ink-secondary leading-relaxed max-w-2xl ${className}`}>
      {children}
    </p>
  );
}

export function Card({ children, className = '', hover = true }) {
  return (
    <div className={`bg-surface rounded-2xl border border-border p-6 sm:p-8 ${hover ? 'hover:border-muted hover:shadow-sm transition-all duration-300' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function IconBox({ children, className = '' }) {
  return (
    <div className={`w-10 h-10 rounded-xl bg-surface-elevated border border-border-subtle flex items-center justify-center text-ink-secondary ${className}`}>
      {children}
    </div>
  );
}

export function Divider({ className = '' }) {
  return <div className={`h-px bg-border w-full ${className}`} />;
}

export function GradientBlob({ className = '', color = 'blue' }) {
  const colors = {
    blue: 'from-accent-blue/8 via-accent-blue/4 to-transparent',
    warm: 'from-accent-warm/8 via-accent-warm/4 to-transparent',
    green: 'from-accent-green/8 via-accent-green/4 to-transparent',
    purple: 'from-accent-purple/8 via-accent-purple/4 to-transparent',
  };
  return (
    <div className={`absolute rounded-full bg-gradient-radial ${colors[color]} blur-3xl pointer-events-none ${className}`} aria-hidden="true" />
  );
}
