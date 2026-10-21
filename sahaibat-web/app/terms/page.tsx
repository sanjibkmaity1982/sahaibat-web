// SERVER COMPONENT. Terms of use in Bahasa Indonesia (the default language).
import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { legalMetadata } from "@/components/legal/meta";

export const metadata: Metadata = legalMetadata("terms", "id");

export default function Page() {
  return <LegalPage doc="terms" lang="id" />;
}
