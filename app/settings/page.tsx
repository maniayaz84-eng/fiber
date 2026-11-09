import Link from "next/link";
import { ArrowLeft, Settings } from "lucide-react";
import { ThemeSettings } from "@/components/theme-settings";

export default function SettingsPage() {
  return (
    <main className="content-page page-container">
      <Link className="back-link" href="/"><ArrowLeft size={15} /> Back to Fiber Link</Link>
      <span className="section-kicker"><Settings size={14} /> PREFERENCES</span>
      <h1>Settings</h1>
      <p className="content-lead">Personalize how Fiber Link looks. Your language can be changed from the top menu.</p>
      <ThemeSettings />
      <div className="placeholder-card"><div><strong>Business settings are not connected</strong><p>Payment instructions, support contacts, and service details must be entered by Fiber Link after admin access is implemented.</p></div></div>
    </main>
  );
}
