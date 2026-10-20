// app/en/page.tsx
// SERVER COMPONENT. English homepage (alias).
// Legacy alias of "/": same page, canonical points at "/".

import { RedesignPage } from "@/components/redesign/RedesignPage";
import { redesignMetadata } from "@/components/redesign/meta";

export const metadata = redesignMetadata("home", "en");

export default function Page() {
  return <RedesignPage lang="en" view="home" />;
}
