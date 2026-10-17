"use strict";
// Application domain model, validation and reference generation.
// Pure TypeScript (no React / no Node-only APIs) so the SAME validation runs
// in the browser (for instant field errors) and on the server (the only
// validation that is trusted).
Object.defineProperty(exports, "__esModule", { value: true });
exports.STEP_FIELDS = exports.UPLOAD_RULES = exports.DOCUMENT_SLOTS = exports.OPTIONS = exports.EMPTY_APPLICATION = exports.APPLICATION_STATUSES = void 0;
exports.validateFileMeta = validateFileMeta;
exports.matchesMagicBytes = matchesMagicBytes;
exports.isValidPhone = isValidPhone;
exports.ageFromDob = ageFromDob;
exports.validateApplication = validateApplication;
exports.sanitizeApplication = sanitizeApplication;
exports.generateApplicationReference = generateApplicationReference;
exports.APPLICATION_STATUSES = [
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
];
exports.EMPTY_APPLICATION = {
    fullName: "", phone: "", whatsapp: "", email: "", dateOfBirth: "", gender: "", county: "", town: "", nationality: "Kenyan",
    preferredCountry: "", preferredJob: "", alternativeJob: "", employmentCategory: "", yearsExperience: "", currentOccupation: "",
    currentlyEmployed: "", willingToRelocate: "Yes", availableForInterview: "Yes", overseasExperience: "", willingMedical: "Yes", willingTraining: "Yes", startDate: "",
    previousJobTitle: "", previousEmployer: "", responsibilities: "", skills: "", languages: "", education: "", certificates: "",
    passportStatus: "", passportNumber: "", passportExpiry: "", canObtainPassport: "",
    emergencyName: "", emergencyRelationship: "", emergencyPhone: "",
    consentAccuracy: false, consentPrivacy: false,
};
exports.OPTIONS = {
    gender: ["Female", "Male", "Prefer not to say"],
    experience: ["First-time applicant", "Less than 1 year", "1–3 years", "3+ years"],
    yesNo: ["Yes", "No"],
    education: ["Primary", "Secondary (KCPE/KCSE)", "Certificate", "Diploma", "Degree", "Other"],
    passport: ["I have a valid passport", "My passport is being processed", "I need to apply for one"],
    category: ["Household", "Driving", "Childcare", "Caregiving", "Education / Tutoring", "Beauty", "Hospitality / Cooking", "Cleaning", "Security", "Warehouse", "Other"],
    startDate: ["As soon as possible", "Within 1 month", "Within 3 months", "Flexible"],
};
// ---------------------------------------------------------------- uploads
exports.DOCUMENT_SLOTS = [
    { key: "cv", label: "CV / Resume", hint: "Optional" },
    { key: "passport", label: "Passport (photo page)", hint: "Optional — share only if you have one" },
    { key: "certificate", label: "Certificate", hint: "Optional" },
    { key: "training", label: "Training certificate", hint: "Optional" },
    { key: "other", label: "Other relevant document", hint: "Optional" },
];
// Limits are sized for Vercel's ~4.5 MB serverless request-body cap. If you
// move uploads to object storage (S3 / Supabase) these can be raised.
exports.UPLOAD_RULES = {
    maxBytesPerFile: 2 * 1024 * 1024,
    maxTotalBytes: 4 * 1024 * 1024,
    allowedMime: ["application/pdf", "image/jpeg", "image/png"],
    allowedExt: ["pdf", "jpg", "jpeg", "png"],
    humanReadable: "PDF, JPG or PNG · up to 2 MB each (4 MB total)",
};
function validateFileMeta(name, type, size) {
    const ext = name.split(".").pop()?.toLowerCase() ?? "";
    if (!exports.UPLOAD_RULES.allowedExt.includes(ext))
        return "Use a PDF, JPG or PNG file.";
    if (!exports.UPLOAD_RULES.allowedMime.includes(type))
        return "That file type isn't accepted. Use PDF, JPG or PNG.";
    if (size > exports.UPLOAD_RULES.maxBytesPerFile)
        return "That file is larger than 2 MB.";
    if (size === 0)
        return "That file is empty.";
    return null;
}
/** Magic-byte check so a renamed .exe can't pass as .pdf. Server-side. */
function matchesMagicBytes(bytes, mime) {
    const startsWith = (sig) => sig.every((b, i) => bytes[i] === b);
    if (mime === "application/pdf")
        return startsWith([0x25, 0x50, 0x44, 0x46]); // %PDF
    if (mime === "image/png")
        return startsWith([0x89, 0x50, 0x4e, 0x47]);
    if (mime === "image/jpeg")
        return startsWith([0xff, 0xd8, 0xff]);
    return false;
}
const PHONE = /^\+?\d{9,13}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function isValidPhone(v) {
    return PHONE.test(v.replace(/[\s-]/g, ""));
}
function ageFromDob(dob, now = new Date()) {
    const d = new Date(dob);
    if (Number.isNaN(d.getTime()))
        return null;
    let age = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate()))
        age--;
    return age;
}
/** Fields that must be valid before the user may leave each step (0-based). */
exports.STEP_FIELDS = [
    ["fullName", "phone", "whatsapp", "email", "dateOfBirth", "gender", "county", "town", "nationality"],
    ["preferredCountry", "preferredJob", "yearsExperience", "startDate"],
    ["emergencyPhone"],
    ["passportStatus", "passportExpiry"],
    ["consentAccuracy", "consentPrivacy"],
];
function validateApplication(a, now = new Date()) {
    const e = {};
    if (a.fullName.trim().length < 3)
        e.fullName = "Enter your full name.";
    if (!a.phone.trim())
        e.phone = "Enter your phone number.";
    else if (!isValidPhone(a.phone))
        e.phone = "Enter a valid phone number, e.g. +254 7XX XXX XXX.";
    if (a.whatsapp.trim() && !isValidPhone(a.whatsapp))
        e.whatsapp = "Enter a valid WhatsApp number.";
    if (a.email.trim() && !EMAIL.test(a.email.trim()))
        e.email = "Enter a valid email address.";
    if (!a.dateOfBirth)
        e.dateOfBirth = "Enter your date of birth.";
    else {
        const age = ageFromDob(a.dateOfBirth, now);
        if (age === null || age > 90)
            e.dateOfBirth = "Enter a valid date of birth.";
        else if (age < 18)
            e.dateOfBirth = "Online applications are for applicants aged 18 and over. Please contact us.";
    }
    if (!a.gender)
        e.gender = "Select an option.";
    if (!a.county.trim())
        e.county = "Enter your county.";
    if (!a.town.trim())
        e.town = "Enter your town or city.";
    if (!a.nationality.trim())
        e.nationality = "Enter your nationality.";
    if (!a.preferredCountry)
        e.preferredCountry = "Choose a destination.";
    if (!a.preferredJob.trim())
        e.preferredJob = "Choose or enter the job you want.";
    if (!a.yearsExperience)
        e.yearsExperience = "Select your experience.";
    if (!a.startDate)
        e.startDate = "Select when you could start.";
    if (a.emergencyPhone.trim() && !isValidPhone(a.emergencyPhone))
        e.emergencyPhone = "Enter a valid phone number.";
    if (!a.passportStatus)
        e.passportStatus = "Select your passport status.";
    if (a.passportStatus === exports.OPTIONS.passport[0] && a.passportExpiry) {
        const exp = new Date(a.passportExpiry);
        if (Number.isNaN(exp.getTime()))
            e.passportExpiry = "Enter a valid date.";
    }
    if (!a.consentAccuracy)
        e.consentAccuracy = "Please confirm to continue.";
    if (!a.consentPrivacy)
        e.consentPrivacy = "Please agree to the privacy notice to continue.";
    return e;
}
/** Trim + length-cap every string so oversized input can't reach email/storage. */
function sanitizeApplication(raw) {
    const out = { ...exports.EMPTY_APPLICATION };
    for (const key of Object.keys(exports.EMPTY_APPLICATION)) {
        const def = exports.EMPTY_APPLICATION[key];
        const v = raw[key];
        if (typeof def === "boolean")
            out[key] = v === true || v === "true" || v === "on";
        else
            out[key] = typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, key === "responsibilities" || key === "skills" ? 1000 : 160) : def;
    }
    return out;
}
// -------------------------------------------------------------- reference
const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I confusion
/** AJM-2026-7F3QK — generated server-side at submission time. */
function generateApplicationReference(randomBytes, now = new Date()) {
    let s = "";
    for (let i = 0; i < 5; i++)
        s += REF_ALPHABET[randomBytes[i] % REF_ALPHABET.length];
    return `AJM-${now.getFullYear()}-${s}`;
}
