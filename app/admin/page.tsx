import Link from "next/link";
import {
  ArrowUpRight,
  ClipboardList,
  CreditCard,
  Package,
  Settings,
  Users,
} from "lucide-react";

const metrics = [
  { title: "Pending payments", note: "Needs database connection", icon: CreditCard },
  { title: "Active subscriptions", note: "Needs database connection", icon: ClipboardList },
  { title: "Customers", note: "Needs database connection", icon: Users },
  { title: "Published packages", note: "Needs database connection", icon: Package },
];

export default function AdminOverview() {
  return (
    <>
      <div className="admin-welcome">
        <div>
          <span className="section-kicker">FIBER LINK OPERATIONS</span>
          <h1>Admin workspace</h1>
          <p>Review the main service workflows and business configuration.</p>
        </div>
        <Link href="/admin/settings" className="button button-outline">
          <Settings size={16} /> Business settings
        </Link>
      </div>

      <div className="admin-stat-grid">
        {metrics.map(({ title, note, icon: Icon }) => (
          <article className="admin-stat-card" key={title}>
            <div className="admin-stat-top"><span>{title}</span><Icon size={18} /></div>
            <strong className="admin-stat-value">—</strong>
            <small>{note}</small>
          </article>
        ))}
      </div>

      <div className="admin-lower-grid">
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div><h2>Recent activity</h2><p>Important updates will appear here.</p></div>
            <ClipboardList className="admin-panel-icon" size={18} />
          </div>
          <div className="admin-empty">
            <span className="empty-icon"><ClipboardList size={22} /></span>
            <strong>No activity to show</strong>
            <p>Activity will appear when the database and admin access are configured.</p>
          </div>
        </section>
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div><h2>Quick links</h2><p>Configuration and workspace</p></div>
          </div>
          <div className="admin-quick-links">
            <Link href="/admin/settings"><span className="quick-icon"><Settings size={17} /></span><span><strong>Business settings</strong><small>Payment instructions and contact details</small></span><ArrowUpRight size={16} /></Link>
            <Link href="/admin/packages"><span className="quick-icon"><Package size={17} /></span><span><strong>Package management</strong><small>Package tools will be connected later</small></span><ArrowUpRight size={16} /></Link>
            <Link href="/admin/customers"><span className="quick-icon"><Users size={17} /></span><span><strong>Customer directory</strong><small>Customer data is not connected</small></span><ArrowUpRight size={16} /></Link>
          </div>
        </section>
      </div>
    </>
  );
}
