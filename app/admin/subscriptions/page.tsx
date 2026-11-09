import { AdminSection } from "@/components/admin-section";
import { ClipboardList } from "lucide-react";

export default function AdminSubscriptionsPage() {
  return (
    <AdminSection
      eyebrow="SERVICE MANAGEMENT"
      title="Subscriptions"
      description="Track payment review, activation pending, active, and other service statuses."
      icon={ClipboardList}
      emptyTitle="Subscriptions are not connected"
      emptyDescription="Customer subscription records and activation controls will appear here after the database and authorization rules are ready."
    />
  );
}
