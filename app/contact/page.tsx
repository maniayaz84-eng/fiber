"use client";

import Link from "next/link";
import { ArrowLeft, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { useAppPreferences } from "@/components/app-shell";

const copy = {
  en: {
    eyebrow: "CONTACT",
    title: "How can we help?",
    intro:
      "Fiber Link’s support contact details have not been provided yet. We’ll publish verified ways to get in touch here.",
    status: "Contact information is not configured",
    statusDetail:
      "No phone number, email address, business hours, or office location has been supplied. We have not added sample details.",
    details: [
      ["Phone or WhatsApp", "Not provided"],
      ["Email", "Not configured"],
      ["Business hours", "Not provided"],
      ["Office location", "Not provided"],
    ],
    back: "Back to Fiber Link",
    about: "Learn about Fiber Link",
  },
  "roman-ur": {
    eyebrow: "RABITA",
    title: "Hum kis tarah madad kar sakte hain?",
    intro:
      "Fiber Link ke support rabtay ki tafseel abhi nahi mili. Tasdeeq shuda rabtay ke zariye yahan diye jayenge.",
    status: "Rabay ki maloomat configure nahi hui",
    statusDetail:
      "Phone number, email, business timings, ya office ka pata abhi nahi diya gaya. Hum ne koi farzi maloomat shamil nahi ki.",
    details: [
      ["Phone ya WhatsApp", "Maloomat nahi di gayi"],
      ["Email", "Configure nahi hui"],
      ["Business timings", "Maloomat nahi di gayi"],
      ["Office ka pata", "Maloomat nahi di gayi"],
    ],
    back: "Fiber Link par wapas",
    about: "Fiber Link ke baare mein",
  },
} as const;

const icons = [Phone, Mail, Clock3, MapPin];

export default function ContactPage() {
  const locale = useAppPreferences();
  const t = copy[locale];

  return (
    <main className="content-page page-container">
      <Link className="back-link" href="/"><ArrowLeft size={15} />{t.back}</Link>
      <span className="section-kicker">{t.eyebrow}</span>
      <h1>{t.title}</h1>
      <p className="content-lead">{t.intro}</p>

      <section className="contact-status">
        <span className="placeholder-icon"><Mail size={20} /></span>
        <div><strong>{t.status}</strong><p>{t.statusDetail}</p></div>
      </section>

      <div className="contact-detail-grid">
        {t.details.map(([label, value], index) => {
          const Icon = icons[index];
          return (
            <article className="contact-detail-card" key={label}>
              <span className="contact-detail-icon"><Icon size={18} /></span>
              <span><strong>{label}</strong><small>{value}</small></span>
            </article>
          );
        })}
      </div>

      <Link className="text-link contact-about-link" href="/about">{t.about}</Link>
    </main>
  );
}
