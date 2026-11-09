"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  Package,
  ScrollText,
  Settings,
  ShieldAlert,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Brand } from "@/components/app-shell";

const navigation: { title: string; href: string; icon: LucideIcon }[] = [
  { title: "Overview", href: "/admin", icon: LayoutDashboard },
  { title: "Payments", href: "/admin/payments", icon: CreditCard },
  { title: "Subscriptions", href: "/admin/subscriptions", icon: ClipboardList },
  { title: "Customers", href: "/admin/customers", icon: Users },
  { title: "Packages", href: "/admin/packages", icon: Package },
  { title: "Settings", href: "/admin/settings", icon: Settings },
  { title: "Audit history", href: "/admin/audit-logs", icon: ScrollText },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentPage = navigation.find(({ href }) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href),
  );
  const title = currentPage?.title ?? "Overview";

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <Brand compact />
        <div className="admin-sidebar-label">WORKSPACE</div>
        <nav className="admin-nav" aria-label="Admin preview navigation">
          {navigation.map(({ title: itemTitle, href, icon: Icon }) => (
            <Link
              className={currentPage?.href === href ? "active" : ""}
              href={href}
              key={href}
              aria-current={currentPage?.href === href ? "page" : undefined}
            >
              <Icon size={18} />
              <span>{itemTitle}</span>
              {currentPage?.href === href && <span className="nav-active-mark" />}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <span className="admin-avatar">FL</span>
          <span><strong>Admin account</strong><small>Preview only</small></span>
        </div>
      </aside>
      <section className="admin-main">
        <div className="admin-topbar">
          <div className="admin-breadcrumb">Workspace <span>/</span> {title}</div>
          <div className="admin-top-actions">
            <span className="preview-chip">UI PREVIEW</span>
            <Link className="admin-profile" href="/admin/login" aria-label="Admin sign-in preview">
              <span>FL</span><ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
        <div className="admin-content">
          <div className="admin-warning">
            <ShieldAlert size={20} />
            <div>
              <strong>Preview only — admin access is not connected yet</strong>
              <p>This workspace has no live customer data and does not perform administrative actions. Supabase authentication, role checks, and database policies must be configured before operational use.</p>
            </div>
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}
