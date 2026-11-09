import Link from "next/link";
import { LockKeyhole } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="admin-auth-wrap">
      <section className="admin-panel admin-auth-card">
        <span className="auth-icon"><LockKeyhole size={21} /></span>
        <span className="section-kicker">ADMIN ACCESS</span>
        <h1>Admin sign-in</h1>
        <p>Admin authentication is not configured. This preview does not accept credentials or grant access to business data.</p>
        <div className="auth-notice">Supabase sign-in and server-side admin role checks must be implemented before admin access is enabled.</div>
        <Link className="button auth-button" href="/admin">Back to admin preview</Link>
      </section>
    </div>
  );
}
