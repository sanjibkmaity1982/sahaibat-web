// app/impact/page.tsx
// SERVER COMPONENT. Impact page (English).

import { RedesignPage } from "@/components/redesign/RedesignPage";
import { redesignMetadata } from "@/components/redesign/meta";

export const metadata = redesignMetadata("impact", "en");

export default function Page() {
  return <RedesignPage lang="en" view="impact" />;
}
