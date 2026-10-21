// SERVER COMPONENT. Privacy policy in English.
import type { Metadata } from "next";
import { PrivacyPolicy } from "@/components/legal/PrivacyPolicy";
import { privacyMetadata } from "@/components/legal/meta";

export const metadata: Metadata = privacyMetadata("en");

export default function Page() {
  return <PrivacyPolicy lang="en" />;
}
