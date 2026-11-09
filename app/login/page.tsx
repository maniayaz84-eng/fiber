import Link from "next/link";
import { LockKeyhole } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="auth-icon"><LockKeyhole size={21} /></span>
        <span className="section-kicker">ACCOUNT ACCESS</span>
        <h1>Sign in</h1>
        <p>Account sign-in will be enabled when Supabase authentication is configured.</p>
        <div className="auth-notice">No credentials are collected or stored by this preview.</div>
        <Link className="button auth-button" href="/">Return to Fiber Link</Link>
        <Link className="auth-secondary" href="/signup">Create an account</Link>
      </section>
    </main>
  );
}
