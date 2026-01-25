export type Scenario = {
  id: string;
  title: string;
  subtitle: string;
  chw: string[];
  reviewer: string[];
  patient: string[];
};

export type RoleKey = "chw" | "reviewer" | "ngo";

