/** Shared (client + server) definitions for the application form. */

export const DOMAIN_IDS = ["cyber", "comms", "data", "ai", "cloud", "resilience", "space", "uav"] as const;
export const TYPES = ["member", "anchor"] as const;
export const RESIDENT = ["yes", "applying", "no"] as const;
export const TEAM_SIZES = ["1–10", "11–50", "51–200", "200+"] as const;

export type Field =
  | "type"
  | "company"
  | "taxId"
  | "website"
  | "resident"
  | "domains"
  | "product"
  | "teamSize"
  | "name"
  | "role"
  | "email"
  | "phone"
  | "message"
  | "consent";

export type ErrorCode = "required" | "email" | "domains" | "url" | "tooLong" | "consent";

export type ApplyState = {
  status: "idle" | "error" | "success" | "failed";
  errors?: Partial<Record<Field, ErrorCode>>;
  /** Submitted values, returned on error so the form keeps what the user typed. */
  values?: Partial<Record<Field, string | string[]>>;
};

export const initialApplyState: ApplyState = { status: "idle" };

export type Application = {
  type: (typeof TYPES)[number];
  company: string;
  taxId: string;
  website: string;
  resident: (typeof RESIDENT)[number];
  domains: (typeof DOMAIN_IDS)[number][];
  product: string;
  teamSize: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  message: string;
  locale: string;
  submittedAt: string;
};
