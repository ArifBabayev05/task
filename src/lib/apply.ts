"use server";

import {
  DOMAIN_IDS,
  RESIDENT,
  TEAM_SIZES,
  TYPES,
  type Application,
  type ApplyState,
  type ErrorCode,
  type Field,
} from "./application";
import { deliverApplication } from "./deliver";

const MAX_SHORT = 200;
const MAX_LONG = 2000;
const MIN_FILL_MS = 3000;

const str = (fd: FormData, key: string) => {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
};

function normalizeUrl(raw: string): string | null {
  if (!raw) return "";
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const u = new URL(withScheme);
    return u.hostname.includes(".") ? u.toString() : null;
  } catch {
    return null;
  }
}

/** Server Action behind the application form (used with useActionState). */
export async function submitApplication(_prev: ApplyState, fd: FormData): Promise<ApplyState> {
  // Spam guards: a hidden honeypot field and a minimum time on the form.
  // Bots get a normal-looking success so they don't learn to adapt.
  const startedAt = Number(str(fd, "startedAt"));
  if (str(fd, "fax") || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "success" };
  }

  const values: ApplyState["values"] = {
    type: str(fd, "type"),
    company: str(fd, "company"),
    taxId: str(fd, "taxId"),
    website: str(fd, "website"),
    resident: str(fd, "resident"),
    domains: fd.getAll("domains").filter((v): v is string => typeof v === "string"),
    product: str(fd, "product"),
    teamSize: str(fd, "teamSize"),
    name: str(fd, "name"),
    role: str(fd, "role"),
    email: str(fd, "email"),
    phone: str(fd, "phone"),
    message: str(fd, "message"),
    consent: fd.get("consent") ? "on" : "",
  };
  const v = values as Record<Field, string> & { domains: string[] };
  const errors: Partial<Record<Field, ErrorCode>> = {};
  const req = (k: Field) => {
    if (!v[k]) errors[k] = "required";
  };

  if (!(TYPES as readonly string[]).includes(v.type)) errors.type = "required";
  req("company");
  if (!(RESIDENT as readonly string[]).includes(v.resident)) errors.resident = "required";
  const domains = v.domains.filter((d) => (DOMAIN_IDS as readonly string[]).includes(d));
  if (domains.length === 0) errors.domains = "domains";
  req("product");
  if (v.teamSize && !(TEAM_SIZES as readonly string[]).includes(v.teamSize)) errors.teamSize = "required";
  req("name");
  if (!v.email) errors.email = "required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) errors.email = "email";
  const website = normalizeUrl(v.website);
  if (website === null) errors.website = "url";
  if (!v.consent) errors.consent = "consent";

  for (const k of ["company", "taxId", "website", "name", "role", "email", "phone"] as const) {
    if (v[k].length > MAX_SHORT) errors[k] = "tooLong";
  }
  for (const k of ["product", "message"] as const) {
    if (v[k].length > MAX_LONG) errors[k] = "tooLong";
  }

  if (Object.keys(errors).length > 0) return { status: "error", errors, values };

  const app: Application = {
    type: v.type as Application["type"],
    company: v.company,
    taxId: v.taxId,
    website: website ?? "",
    resident: v.resident as Application["resident"],
    domains: domains as Application["domains"],
    product: v.product,
    teamSize: v.teamSize,
    name: v.name,
    role: v.role,
    email: v.email,
    phone: v.phone,
    message: v.message,
    locale: str(fd, "locale") === "en" ? "en" : "az",
    submittedAt: new Date().toISOString(),
  };

  const ok = await deliverApplication(app);
  return ok ? { status: "success" } : { status: "failed", values };
}
