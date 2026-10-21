// SERVER COMPONENT. Terms of use in English.
import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { legalMetadata } from "@/components/legal/meta";

export const metadata: Metadata = legalMetadata("terms", "en");

export default function Page() {
  return <LegalPage doc="terms" lang="en" />;
}
