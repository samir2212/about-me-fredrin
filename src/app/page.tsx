import { profile } from "@/content/profile";
import { Clouds } from "@/components/Clouds";
import { CountUp } from "@/components/CountUp";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { TiltCard } from "@/components/TiltCard";
import { DeployTerminal } from "@/components/DeployTerminal";
import { CopyEmail } from "@/components/CopyEmail";
import { Wordmark } from "@/components/Wordmark";
import { CostOptimization } from "@/components/CostOptimization";

export const dynamic = "force-static";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Home() {
  const p = profile;
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="sky" aria-hidden="true" />

      <header className="nav" id="top">
        <div className="wrap nav__inner">
          <Wordmark name={p.name} />
          <nav aria-label="Primary">
            <ul>
              {p.nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="about" aria-labelledby="hero-title">
          <Clouds />
          <div className="wrap hero__inner">
            <p className="pill">{p.tag}</p>
            <h1 id="hero-title">
              {p.headline.lead} <em className="gradient">{p.headline.accent}</em>
            </h1>
            <p className="lead">{p.intro}</p>
            <div className="actions">
              <a className="btn btn--primary" href={`mailto:${p.email}`}>
                Work with me
              </a>
              <a className="btn btn--ghost" href="#shipped">
                See what I&apos;ve shipped ↓
              </a>
            </div>

            <ul className="stats" aria-label="Highlights" data-reveal>
              {p.stats.map((s) => (
                <li key={s.label} className="stat">
                  {s.countTo ? <CountUp stat={s} /> : <span className="stat__value">{s.value}</span>}
                  <span className="stat__label">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="shipped" aria-labelledby="shipped-title">
          <div className="wrap">
            <div className="section__head" data-reveal>
              <h2 className="eyebrow" id="shipped-title">
                {p.shippedHeading}
              </h2>
              <DeployTerminal command={p.terminal.command} lines={p.terminal.lines} />
            </div>

            <div className="grid grid--2">
              {p.projects.map((proj, i) => (
                <TiltCard
                  key={proj.name}
                  className={`card card--feature card--${proj.accent}`}
                  data-reveal
                  style={{ "--delay": `${i * 120}ms` } as React.CSSProperties}
                >
                  <h3>{proj.name}</h3>
                  <p className="meta">
                    {proj.role} · {proj.domain} · {proj.period}
                  </p>
                  <p className="big">
                    <strong>{proj.headline.value}</strong>
                    <span>{proj.headline.label}</span>
                  </p>
                  <ul className="points">
                    {proj.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <ul className="chips" aria-label="Stack">
                    {proj.chips.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--tight" aria-labelledby="partners-title">
          <div className="wrap">
            <div data-reveal>
              <h2 className="eyebrow" id="partners-title">
                {p.partnersHeading}
              </h2>
              <p className="section__intro">{p.partnersIntro}</p>
            </div>
            <div className="grid grid--2">
              {p.partners.map((pa, i) => (
                <TiltCard
                  key={pa.name}
                  className="card card--small"
                  data-reveal
                  style={{ "--delay": `${i * 120}ms` } as React.CSSProperties}
                >
                  <h3>{pa.name}</h3>
                  <p className="meta">
                    {pa.role} · {pa.period}
                  </p>
                  <ul className="points">
                    {pa.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--tight" aria-labelledby="skills-title">
          <div className="wrap" data-reveal>
            <h2 className="eyebrow" id="skills-title">
              {p.skillsHeading}
            </h2>
            <ul className="chips chips--skills">
              {p.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="contact" aria-labelledby="contact-title">
          <div className="wrap">
            <h2 className="eyebrow" id="contact-title" data-reveal>
              {p.contactHeading}
            </h2>
            <div className="contact" data-reveal>
              <h3>{p.contactTitle}</h3>
              <p>{p.contactText}</p>
              <div className="actions">
                <a className="btn btn--primary" href={`mailto:${p.email}`}>
                  {p.email}
                </a>
                <CopyEmail email={p.email} />
                {p.links.map((l) => (
                  <a key={l.href} className="btn btn--ghost" href={l.href} {...external}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap footer">{p.footer}</footer>

      <RevealOnScroll />
      <CostOptimization />
    </>
  );
}
