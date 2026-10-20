// app/id/page.tsx
// SERVER COMPONENT. Bahasa Indonesia homepage — Concept A redesign.

import { RedesignPage } from "@/components/redesign/RedesignPage";
import { redesignMetadata } from "@/components/redesign/meta";

export const metadata = redesignMetadata("home", "id");

export default function Page() {
  return <RedesignPage lang="id" view="home" />;
}
