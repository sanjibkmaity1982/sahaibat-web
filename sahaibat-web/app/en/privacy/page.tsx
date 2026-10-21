// SERVER COMPONENT. Privacy policy in English.
import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { legalMetadata } from "@/components/legal/meta";

export const metadata: Metadata = legalMetadata("privacy", "en");

export default function Page() {
  return <LegalPage doc="privacy" lang="en" />;
}
