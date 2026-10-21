// app/impact/page.tsx
// SERVER COMPONENT. Impact page (Bahasa Indonesia, the default language).

import { RedesignPage } from "@/components/redesign/RedesignPage";
import { redesignMetadata } from "@/components/redesign/meta";

export const metadata = redesignMetadata("impact", "id");

export default function Page() {
  return <RedesignPage lang="id" view="impact" />;
}
