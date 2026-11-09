"use client";

import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Wifi } from "lucide-react";
import { useAppPreferences } from "@/components/app-shell";

const copy = {
  en: {
    eyebrow: "ABOUT FIBER LINK",
    title: "Internet service, with a clearer customer journey.",
    intro:
      "Fiber Link is building a straightforward place to explore internet packages, submit a service request, and follow its progress.",
    noteTitle: "Company details are not published yet",
    note:
      "Verified company history, service areas, and business information will be added when Fiber Link provides them.",
    principlesTitle: "What this portal is designed to do",
    principles: [
      ["Clear package information", "Show plan details and conditions supplied by Fiber Link."],
      ["Transparent service status", "Keep payment review separate from actual connection activation."],
      ["Customer-first access", "Give customers a private place to follow their own requests."],
    ],
    contact: "Contact Fiber Link",
    home: "Back to home",
  },
  "roman-ur": {
    eyebrow: "FIBER LINK KE BAARE MEIN",
    title: "Internet service aur customer ke liye saaf tareeqa.",
    intro:
      "Fiber Link aik seedha portal bana raha hai jahan internet packages dekhein, service request bhejein, aur uski progress check karein.",
    noteTitle: "Company ki tafseel abhi publish nahi hui",
    note:
      "Company ki tasdeeq shuda history, service areas, aur business maloomat Fiber Link ke dene par yahan add ki jayengi.",
    principlesTitle: "Yeh portal kin cheezon ke liye banaya ja raha hai",
    principles: [
      ["Package ki saaf maloomat", "Fiber Link ki di hui plan details aur sharaait dikhana."],
      ["Service status ki wazahat", "Payment review aur asal connection activation ko alag rakhna."],
      ["Customer ki sahulat", "Customers ko apni requests dekhne ke liye private jagah dena."],
    ],
    contact: "Fiber Link se rabita karein",
    home: "Home par wapas",
  },
} as const;

const icons = [Wifi, ShieldCheck, Compass];

export default function AboutPage() {
  const locale = useAppPreferences();
  const t = copy[locale];

  return (
    <main className="content-page page-container">
      <span className="section-kicker">{t.eyebrow}</span>
      <h1>{t.title}</h1>
      <p className="content-lead">{t.intro}</p>

      <section className="placeholder-card about-note">
        <span className="placeholder-icon"><Compass size={20} /></span>
        <div><strong>{t.noteTitle}</strong><p>{t.note}</p></div>
      </section>

      <section className="about-principles">
        <h2>{t.principlesTitle}</h2>
        <div className="about-principle-grid">
          {t.principles.map(([title, description], index) => {
            const Icon = icons[index];
            return (
              <article className="about-principle-card" key={title}>
                <span className="benefit-icon cyan"><Icon size={20} /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <div className="about-actions">
        <Link className="button" href="/contact">{t.contact}<ArrowRight size={16} /></Link>
        <Link className="text-link" href="/">{t.home}</Link>
      </div>
    </main>
  );
}
