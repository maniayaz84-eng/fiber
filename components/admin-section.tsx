import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Search } from "lucide-react";

type AdminSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  emptyTitle: string;
  emptyDescription: string;
  children?: ReactNode;
};

export function AdminSection({
  eyebrow,
  title,
  description,
  icon: Icon,
  emptyTitle,
  emptyDescription,
  children,
}: AdminSectionProps) {
  return (
    <>
      <div className="admin-welcome admin-section-welcome">
        <div>
          <span className="section-kicker">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      {children ?? (
        <section className="admin-panel admin-list-panel">
          <div className="admin-list-toolbar">
            <label className="admin-search">
              <Search size={16} />
              <input aria-label={`Search ${title.toLowerCase()}`} placeholder={`Search ${title.toLowerCase()}...`} disabled />
            </label>
            <span className="admin-disabled-filter">Filters available after setup</span>
          </div>
          <div className="admin-empty admin-list-empty">
            <span className="empty-icon"><Icon size={22} /></span>
            <strong>{emptyTitle}</strong>
            <p>{emptyDescription}</p>
          </div>
          <p className="admin-list-footnote">Search, filters, and records will be connected after Supabase is configured.</p>
        </section>
      )}
    </>
  );
}
