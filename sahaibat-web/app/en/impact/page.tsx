// app/en/impact/page.tsx
// SERVER COMPONENT. Impact page (English). Bahasa Indonesia is the default at /impact.

import { RedesignPage } from "@/components/redesign/RedesignPage";
import { redesignMetadata } from "@/components/redesign/meta";

export const metadata = redesignMetadata("impact", "en");

export default function Page() {
  return <RedesignPage lang="en" view="impact" />;
}
