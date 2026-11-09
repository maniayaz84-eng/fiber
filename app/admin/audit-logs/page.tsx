import { AdminSection } from "@/components/admin-section";
import { ScrollText } from "lucide-react";

export default function AdminAuditLogsPage() {
  return (
    <AdminSection
      eyebrow="ACCOUNTABILITY"
      title="Audit history"
      description="Review a record of privileged changes and important admin actions."
      icon={ScrollText}
      emptyTitle="Audit history is not connected"
      emptyDescription="Admin actions will be recorded here after authorized operations and database audit logging are implemented."
    />
  );
}
