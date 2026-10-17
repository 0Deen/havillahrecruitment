// Application domain model, validation and reference generation.
// Pure TypeScript (no React / no Node-only APIs) so the SAME validation runs
// in the browser (for instant field errors) and on the server (the only
// validation that is trusted).

export const APPLICATION_STATUSES = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "SCREENING",
  "INTERVIEW",
  "DOCUMENTATION",
  "MEDICAL",
  "TRAINING",
  "READY_FOR_DEPLOYMENT",
  "DEPLOYED",
  "CLOSED",
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export interface ApplicationInput {
  // 1 personal
  fullName: string;
  phone: string;
  whatsapp: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  county: string;
  town: string;
  nationality: string;
  // 2 job preference + 5 destination
  preferredCountry: string;
  preferredJob: string;
  alternativeJob: string;
  employmentCategory: string;
  yearsExperience: string;
  currentOccupation: string;
  // 6 employment questions
  currentlyEmployed: string;
  willingToRelocate: string;
  availableForInterview: string;
  overseasExperience: string;
  willingMedical: string;
  willingTraining: string;
  startDate: string;
  // 3 experience
  previousJobTitle: string;
  previousEmployer: string;
  responsibilities: string;
  skills: string;
  languages: string;
  education: string;
  certificates: string;
  // 4 documentation
  passportStatus: string;
  passportNumber: string;
  passportExpiry: string;
  canObtainPassport: string;
  // 7 emergency contact
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  // 8 consent
  consentAccuracy: boolean;
  consentPrivacy: boolean;
}

export const EMPTY_APPLICATION: ApplicationInput = {
  fullName: "", phone: "", whatsapp: "", email: "", dateOfBirth: "", gender: "", county: "", town: "", nationality: "Kenyan",
  preferredCountry: "", preferredJob: "", alternativeJob: "", employmentCategory: "", yearsExperience: "", currentOccupation: "",
  currentlyEmployed: "", willingToRelocate: "Yes", availableForInterview: "Yes", overseasExperience: "", willingMedical: "Yes", willingTraining: "Yes", startDate: "",
  previousJobTitle: "", previousEmployer: "", responsibilities: "", skills: "", languages: "", education: "", certificates: "",
  passportStatus: "", passportNumber: "", passportExpiry: "", canObtainPassport: "",
  emergencyName: "", emergencyRelationship: "", emergencyPhone: "",
  consentAccuracy: false, consentPrivacy: false,
};

export const OPTIONS = {
  gender: ["Female", "Male", "Prefer not to say"],
  experience: ["First-time applicant", "Less than 1 year", "1–3 years", "3+ years"],
  yesNo: ["Yes", "No"],
  education: ["Primary", "Secondary (KCPE/KCSE)", "Certificate", "Diploma", "Degree", "Other"],
  passport: ["I have a valid passport", "My passport is being processed", "I need to apply for one"],
  category: ["Household", "Driving", "Childcare", "Caregiving", "Education / Tutoring", "Beauty", "Hospitality / Cooking", "Cleaning", "Security", "Warehouse", "Other"],
  startDate: ["As soon as possible", "Within 1 month", "Within 3 months", "Flexible"],
} as const;

// ---------------------------------------------------------------- uploads

export const DOCUMENT_SLOTS = [
  { key: "cv", label: "CV / Resume", hint: "Optional" },
  { key: "passport", label: "Passport (photo page)", hint: "Optional — share only if you have one" },
  { key: "certificate", label: "Certificate", hint: "Optional" },
  { key: "training", label: "Training certificate", hint: "Optional" },
  { key: "other", label: "Other relevant document", hint: "Optional" },
] as const;
export type DocumentSlotKey = (typeof DOCUMENT_SLOTS)[number]["key"];

// Limits are sized for Vercel's ~4.5 MB serverless request-body cap. If you
// move uploads to object storage (S3 / Supabase) these can be raised.
export const UPLOAD_RULES = {
  maxBytesPerFile: 2 * 1024 * 1024,
  maxTotalBytes: 4 * 1024 * 1024,
  allowedMime: ["application/pdf", "image/jpeg", "image/png"],
  allowedExt: ["pdf", "jpg", "jpeg", "png"],
  humanReadable: "PDF, JPG or PNG · up to 2 MB each (4 MB total)",
} as const;

export function validateFileMeta(name: string, type: string, size: number): string | null {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (!(UPLOAD_RULES.allowedExt as readonly string[]).includes(ext)) return "Use a PDF, JPG or PNG file.";
  if (!(UPLOAD_RULES.allowedMime as readonly string[]).includes(type)) return "That file type isn't accepted. Use PDF, JPG or PNG.";
  if (size > UPLOAD_RULES.maxBytesPerFile) return "That file is larger than 2 MB.";
  if (size === 0) return "That file is empty.";
  return null;
}

/** Magic-byte check so a renamed .exe can't pass as .pdf. Server-side. */
export function matchesMagicBytes(bytes: Uint8Array, mime: string): boolean {
  const startsWith = (sig: number[]) => sig.every((b, i) => bytes[i] === b);
  if (mime === "application/pdf") return startsWith([0x25, 0x50, 0x44, 0x46]); // %PDF
  if (mime === "image/png") return startsWith([0x89, 0x50, 0x4e, 0x47]);
  if (mime === "image/jpeg") return startsWith([0xff, 0xd8, 0xff]);
  return false;
}

// ------------------------------------------------------------- validation

export type FieldErrors = Partial<Record<keyof ApplicationInput, string>>;

const PHONE = /^\+?\d{9,13}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidPhone(v: string) {
  return PHONE.test(v.replace(/[\s-]/g, ""));
}

export function ageFromDob(dob: string, now = new Date()): number | null {
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

/** Fields that must be valid before the user may leave each step (0-based). */
export const STEP_FIELDS: (keyof ApplicationInput)[][] = [
  ["fullName", "phone", "whatsapp", "email", "dateOfBirth", "gender", "county", "town", "nationality"],
  ["preferredCountry", "preferredJob", "yearsExperience", "startDate"],
  ["emergencyPhone"],
  ["passportStatus", "passportExpiry"],
  ["consentAccuracy", "consentPrivacy"],
];

export function validateApplication(a: ApplicationInput, now = new Date()): FieldErrors {
  const e: FieldErrors = {};
  if (a.fullName.trim().length < 3) e.fullName = "Enter your full name.";
  if (!a.phone.trim()) e.phone = "Enter your phone number.";
  else if (!isValidPhone(a.phone)) e.phone = "Enter a valid phone number, e.g. +254 7XX XXX XXX.";
  if (a.whatsapp.trim() && !isValidPhone(a.whatsapp)) e.whatsapp = "Enter a valid WhatsApp number.";
  if (a.email.trim() && !EMAIL.test(a.email.trim())) e.email = "Enter a valid email address.";
  if (!a.dateOfBirth) e.dateOfBirth = "Enter your date of birth.";
  else {
    const age = ageFromDob(a.dateOfBirth, now);
    if (age === null || age > 90) e.dateOfBirth = "Enter a valid date of birth.";
    else if (age < 18) e.dateOfBirth = "Online applications are for applicants aged 18 and over. Please contact us.";
  }
  if (!a.gender) e.gender = "Select an option.";
  if (!a.county.trim()) e.county = "Enter your county.";
  if (!a.town.trim()) e.town = "Enter your town or city.";
  if (!a.nationality.trim()) e.nationality = "Enter your nationality.";

  if (!a.preferredCountry) e.preferredCountry = "Choose a destination.";
  if (!a.preferredJob.trim()) e.preferredJob = "Choose or enter the job you want.";
  if (!a.yearsExperience) e.yearsExperience = "Select your experience.";
  if (!a.startDate) e.startDate = "Select when you could start.";

  if (a.emergencyPhone.trim() && !isValidPhone(a.emergencyPhone)) e.emergencyPhone = "Enter a valid phone number.";

  if (!a.passportStatus) e.passportStatus = "Select your passport status.";
  if (a.passportStatus === OPTIONS.passport[0] && a.passportExpiry) {
    const exp = new Date(a.passportExpiry);
    if (Number.isNaN(exp.getTime())) e.passportExpiry = "Enter a valid date.";
  }

  if (!a.consentAccuracy) e.consentAccuracy = "Please confirm to continue.";
  if (!a.consentPrivacy) e.consentPrivacy = "Please agree to the privacy notice to continue.";
  return e;
}

/** Trim + length-cap every string so oversized input can't reach email/storage. */
export function sanitizeApplication(raw: Partial<Record<keyof ApplicationInput, unknown>>): ApplicationInput {
  const out = { ...EMPTY_APPLICATION } as Record<string, string | boolean>;
  for (const key of Object.keys(EMPTY_APPLICATION) as (keyof ApplicationInput)[]) {
    const def = EMPTY_APPLICATION[key];
    const v = raw[key];
    if (typeof def === "boolean") out[key] = v === true || v === "true" || v === "on";
    else out[key] = typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, key === "responsibilities" || key === "skills" ? 1000 : 160) : def;
  }
  return out as unknown as ApplicationInput;
}

// -------------------------------------------------------------- reference

const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I confusion

/** AJM-2026-7F3QK — generated server-side at submission time. */
export function generateApplicationReference(randomBytes: Uint8Array, now = new Date()): string {
  let s = "";
  for (let i = 0; i < 5; i++) s += REF_ALPHABET[randomBytes[i] % REF_ALPHABET.length];
  return `AJM-${now.getFullYear()}-${s}`;
}
