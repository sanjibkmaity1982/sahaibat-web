// SERVER COMPONENT. Privacy policy in Bahasa Indonesia (the default language).
import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { legalMetadata } from "@/components/legal/meta";

export const metadata: Metadata = legalMetadata("privacy", "id");

export default function Page() {
  return <LegalPage doc="privacy" lang="id" />;
}
