import Link from "next/link";
import { UserRoundPlus } from "lucide-react";

export default function SignupPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="auth-icon"><UserRoundPlus size={21} /></span>
        <span className="section-kicker">CUSTOMER ACCOUNT</span>
        <h1>Create an account</h1>
        <p>Customer registration will be enabled after authentication and secure profile storage are configured.</p>
        <div className="auth-notice">This preview does not accept or store personal information.</div>
        <Link className="button auth-button" href="/">Return to Fiber Link</Link>
        <Link className="auth-secondary" href="/login">Already have an account? Sign in</Link>
      </section>
    </main>
  );
}
