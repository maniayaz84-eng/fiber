import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";

export default function PackagesPage() {
  return (
    <main className="content-page page-container">
      <span className="section-kicker">INTERNET PACKAGES</span>
      <h1>Choose a plan that fits your home.</h1>
      <p className="content-lead">Package prices, speeds, validity, and conditions will appear here after Fiber Link provides verified details.</p>
      <div className="placeholder-card">
        <span className="placeholder-icon"><Info size={20} /></span>
        <div><strong>Packages are not configured yet</strong><p>No prices or service details have been invented. Please check back when Fiber Link publishes its plans.</p></div>
      </div>
      <Link className="text-link" href="/">Back to home<ArrowRight size={16} /></Link>
    </main>
  );
}
