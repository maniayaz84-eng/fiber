"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CircleHelp,
  Gauge,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { useAppPreferences } from "@/components/app-shell";
import { SignalLink } from "@/components/signal-link";

const copy = {
  en: {
    eyebrow: "A better connection starts here",
    title: "Internet that keeps you",
    titleAccent: "moving forward.",
    intro:
      "Explore a simpler way to choose your home internet. Clear packages, straightforward steps, and support when you need it.",
    reassurance: "No invented coverage, packages, or payment details.",
    browse: "Explore packages",
    how: "See how it works",
    cardTitle: "Your next connection",
    cardText: "Find a plan that fits your home and the way you use the internet.",
    speed: "Plans for your pace",
    speedText: "Compare speed and pricing once Fiber Link publishes its packages.",
    clear: "Straightforward process",
    clearText: "Choose a plan, submit payment proof, then follow your request.",
    secure: "Private account area",
    secureText: "Your subscription updates belong in your own customer dashboard.",
    sectionLabel: "A simple start",
    sectionTitle: "From choosing to getting connected",
    steps: [
      ["01", "Choose a package", "Compare the available speeds, prices, and conditions."],
      ["02", "Send payment proof", "Follow the configured payment instructions and upload a receipt."],
      ["03", "Verification", "Fiber Link reviews the payment before approving your request."],
      ["04", "Activation", "Service is marked active only after provisioning is confirmed."],
    ],
    faqLabel: "Good to know",
    faqTitle: "A few common questions",
    faq: [
      ["Are packages and coverage available now?", "Package, coverage, and contact details will appear here after Fiber Link configures verified business information."],
      ["Does payment approval activate my internet?", "No. Payment approval and service activation are separate steps. Activation follows only after provisioning is confirmed."],
      ["Can I pay online here?", "This portal does not process payments. Payment instructions and receipt review will be configured by Fiber Link."],
    ],
    footer: "Reliable internet starts with clear information.",
    footerLink: "Browse packages",
  },
  "roman-ur": {
    eyebrow: "Behtar connection yahan se shuru",
    title: "Internet jo aap ko",
    titleAccent: "aagay barhaye.",
    intro:
      "Ghar ke internet ke liye asaan tareeqa dekhein. Saaf packages, seedhay steps, aur zaroorat par madad.",
    reassurance: "Coverage, packages, ya payment ki ghair tasdeeq shuda tafseel nahi.",
    browse: "Packages dekhein",
    how: "Tareeqa dekhein",
    cardTitle: "Aap ka agla connection",
    cardText: "Apne ghar aur internet istemal ke mutabiq plan dekhein.",
    speed: "Aap ki raftaar ke plans",
    speedText: "Fiber Link ke packages publish honay par speed aur qeemat compare karein.",
    clear: "Seedha process",
    clearText: "Plan chunein, payment proof bhejein, aur request ka status dekhein.",
    secure: "Private account area",
    secureText: "Aap ki subscription updates sirf aap ke dashboard mein hon gi.",
    sectionLabel: "Asaan shuruaat",
    sectionTitle: "Package se connection tak",
    steps: [
      ["01", "Package chunein", "Maujood speed, qeemat, aur sharaait ka muqabla karein."],
      ["02", "Payment proof bhejein", "Di hui hidayaat par amal karein aur receipt upload karein."],
      ["03", "Tasdeeq", "Fiber Link request manzoor karne se pehle payment check karega."],
      ["04", "Activation", "Service provisioning ki tasdeeq ke baad active hogi."],
    ],
    faqLabel: "Maloomat",
    faqTitle: "Aam sawalat",
    faq: [
      ["Kya packages aur coverage abhi available hain?", "Package, coverage, aur rabtay ki tafseel Fiber Link ki tasdeeq ke baad yahan di jayegi."],
      ["Kya payment approve hotay hi internet active ho jayega?", "Nahi. Payment approval aur service activation alag steps hain. Provisioning ki tasdeeq ke baad activation hogi."],
      ["Kya yahan online payment ho sakti hai?", "Yeh portal payment process nahi karta. Fiber Link payment ki hidayaat aur receipt review configure karega."],
    ],
    footer: "Behtar internet ka aaghaz saaf maloomat se.",
    footerLink: "Packages dekhein",
  },
} as const;

export default function Home() {
  const locale = useAppPreferences();
  const t = copy[locale];

  return (
    <main>
      <section className="hero-section">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="page-container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" />{t.eyebrow}</div>
            <h1>{t.title} <span>{t.titleAccent}</span></h1>
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-actions">
              <Link className="button" href="/packages">{t.browse}<ArrowRight size={17} /></Link>
              <Link className="text-link" href="#how-it-works">{t.how}<ArrowDownRight size={16} /></Link>
            </div>
            <div className="hero-note">
              <ShieldCheck size={17} />
              <span>{t.reassurance}</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Fiber Link internet illustration">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="signal signal-one" />
            <div className="signal signal-two" />
            <div className="signal signal-three" />
            <div className="router-card">
              <div className="router-top">
                <div className="router-icon"><Wifi size={24} /></div>
                <span className="status-dot" />
              </div>
              <div className="router-line router-line-long" />
              <div className="router-line router-line-short" />
              <div className="router-bottom">
                <span /><span /><span /><span />
                <small>FIBER LINK</small>
              </div>
            </div>
            <div className="floating-card floating-card-top">
              <span className="floating-icon"><Gauge size={17} /></span>
              <span><strong>Made for your home</strong><small>Choose when plans are available</small></span>
            </div>
            <div className="floating-card floating-card-bottom">
              <span className="floating-check"><Check size={16} /></span>
              <span><strong>Clear steps</strong><small>Track your request status</small></span>
            </div>
            <div className="hero-caption">{t.cardTitle}<small>{t.cardText}</small></div>
          </div>
        </div>
        <div className="hero-bottom-line" />
      </section>

      <section className="benefit-section">
        <div className="page-container benefit-grid">
          <article className="benefit-card">
            <span className="benefit-icon cyan"><Gauge size={20} /></span>
            <div><h2>{t.speed}</h2><p>{t.speedText}</p></div>
          </article>
          <article className="benefit-card">
            <span className="benefit-icon blue"><Check size={20} /></span>
            <div><h2>{t.clear}</h2><p>{t.clearText}</p></div>
          </article>
          <article className="benefit-card">
            <span className="benefit-icon violet"><ShieldCheck size={20} /></span>
            <div><h2>{t.secure}</h2><p>{t.secureText}</p></div>
          </article>
        </div>
      </section>

      <section className="steps-section" id="how-it-works">
        <div className="page-container">
          <div className="section-heading">
            <span className="section-kicker">{t.sectionLabel}</span>
            <h2>{t.sectionTitle}</h2>
          </div>
          <div className="steps-grid">
            {t.steps.map(([number, title, description]) => (
              <article className="step-card" key={number}>
                <span className="step-number">{number}</span>
                <div className="step-connector" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="page-container faq-layout">
          <div className="section-heading faq-heading">
            <span className="section-kicker"><CircleHelp size={15} />{t.faqLabel}</span>
            <h2>{t.faqTitle}</h2>
            <p>Business information will be added when Fiber Link provides verified details.</p>
          </div>
          <div className="faq-list">
            {t.faq.map(([question, answer]) => (
              <details className="faq-item" key={question}>
                <summary>{question}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-container footer-inner">
          <div><span className="footer-brand">Fiber<span>Link</span></span><p>{t.footer}</p></div>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <SignalLink className="footer-signal-link" showLabel />
            <Link className="footer-link" href="/packages">{t.footerLink}<ArrowRight size={16} /></Link>
          </nav>
        </div>
        <div className="page-container footer-legal"><span>© {new Date().getFullYear()} Fiber Link</span><span>Service availability and terms will be provided by Fiber Link.</span></div>
      </footer>
    </main>
  );
}
