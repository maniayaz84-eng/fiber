import { AdminSection } from "@/components/admin-section";
import { CreditCard } from "lucide-react";

export default function AdminPaymentsPage() {
  return (
    <AdminSection
      eyebrow="PAYMENT REVIEW"
      title="Payments"
      description="Review submitted payment proofs and follow up on pending verifications."
      icon={CreditCard}
      emptyTitle="Payment review is not connected"
      emptyDescription="Payment submissions and private receipt previews will appear here after Supabase and private storage are configured."
    />
  );
}
