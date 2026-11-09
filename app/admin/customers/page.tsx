import { AdminSection } from "@/components/admin-section";
import { Users } from "lucide-react";

export default function AdminCustomersPage() {
  return (
    <AdminSection
      eyebrow="CUSTOMER DIRECTORY"
      title="Customers"
      description="Find customer profiles and review their service history."
      icon={Users}
      emptyTitle="Customer records are not connected"
      emptyDescription="No customer personal information is loaded in this preview. Records will only be shown after secure admin access is implemented."
    />
  );
}
