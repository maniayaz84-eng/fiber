import { AdminSection } from "@/components/admin-section";
import { Package } from "lucide-react";

export default function AdminPackagesPage() {
  return (
    <AdminSection
      eyebrow="PRODUCT CATALOG"
      title="Packages"
      description="Manage the internet plans customers can browse and request."
      icon={Package}
      emptyTitle="No packages configured"
      emptyDescription="Verified package speeds, prices, validity, and conditions will appear here after package management is connected."
    />
  );
}
