import { AdminSection } from "@/components/admin-section";
import { CreditCard, Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <AdminSection
      eyebrow="BUSINESS CONFIGURATION"
      title="Admin settings"
      description="Configure verified payment instructions and Fiber Link contact information."
      icon={Settings}
      emptyTitle="Business settings are not connected"
      emptyDescription="Payment instructions, support contacts, and operating details need to be provided and verified before they can be configured."
    >
      <div className="admin-settings-grid">
        <section className="admin-panel admin-config-card">
          <span className="quick-icon"><CreditCard size={18} /></span>
          <h2>Payment instructions</h2>
          <p>Add only verified bank or wallet details. Customers will see instructions after they are configured.</p>
          <span className="admin-config-status">Not configured</span>
        </section>
        <section className="admin-panel admin-config-card">
          <span className="quick-icon"><Settings size={18} /></span>
          <h2>Support and business details</h2>
          <p>Support contacts, operating hours, and service areas have not been supplied yet.</p>
          <span className="admin-config-status">Not configured</span>
        </section>
      </div>
    </AdminSection>
  );
}
