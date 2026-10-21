import type { Metadata } from "next";
import { privacyMetadata } from "@/components/legal/meta";

export const metadata: Metadata = privacyMetadata("id");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
