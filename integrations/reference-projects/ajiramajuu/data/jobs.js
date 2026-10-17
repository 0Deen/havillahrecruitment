"use strict";
// Centralized job + destination data. Every page (homepage sections,
// /destinations, /jobs, the AI assistant's system prompt context, and the
// apply form's prefill) reads from here instead of duplicating copy, so a
// future update only has to happen in one place.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RECRUITMENT_PROCESS = exports.QATAR_CONFIRMED_BENEFITS = exports.jobs = exports.jobCategories = exports.destinations = void 0;
exports.getDestinationBySlug = getDestinationBySlug;
exports.getJobBySlug = getJobBySlug;
exports.getActiveJobs = getActiveJobs;
exports.getJobsByCountrySlug = getJobsByCountrySlug;
exports.findDestinationInText = findDestinationInText;
exports.detectJobsInText = detectJobsInText;
exports.searchJobs = searchJobs;
exports.jobApplyHref = jobApplyHref;
exports.destinationApplyHref = destinationApplyHref;
// Order here controls both the destination-strip order in GulfShowcase and
// the dot indicators beneath it, plus the order on /destinations.
exports.destinations = [
    {
        name: "Saudi Arabia",
        slug: "saudi-arabia",
        flag: "🇸🇦",
        aliases: ["saudi", "ksa", "riyadh", "jeddah"],
        heroImage: "/images/countries/welcometosaudi.png",
        thumbImage: "/images/countries/saudiarabia.png",
        blurb: "Household, hospitality and general roles across Saudi Arabia.",
        active: true,
    },
    {
        name: "United Arab Emirates",
        slug: "uae",
        flag: "🇦🇪",
        aliases: ["uae", "dubai", "abu dhabi", "emirates", "united arab emirates"],
        heroImage: "/images/countries/dubaicity.png",
        thumbImage: "/images/countries/dubai.png",
        blurb: "Opportunities across Dubai and the wider UAE, depending on current demand.",
        active: true,
    },
    {
        name: "Qatar",
        slug: "qatar",
        flag: "🇶🇦",
        aliases: ["qatar", "doha"],
        heroImage: "/images/countries/qatar.png",
        thumbImage: "/images/countries/qataar.png",
        blurb: "Our most active destination — household, driving, caregiving and more.",
        active: true,
    },
    {
        name: "Kuwait",
        slug: "kuwait",
        flag: "🇰🇼",
        aliases: ["kuwait"],
        heroImage: "/images/countries/kuwaitcity.png",
        thumbImage: "/images/countries/kuwait.png",
        blurb: "Household and general roles across Kuwait, depending on current demand.",
        active: true,
    },
    {
        name: "Bahrain",
        slug: "bahrain",
        flag: "🇧🇭",
        aliases: ["bahrain", "manama"],
        heroImage: "/images/countries/manamabahrain.png",
        thumbImage: "/images/countries/bahrain.png",
        blurb: "Household and general roles across Bahrain, depending on current demand.",
        active: true,
    },
    {
        name: "Oman",
        slug: "oman",
        flag: "🇴🇲",
        aliases: ["oman", "muscat"],
        heroImage: "/images/countries/muscatoman.png",
        thumbImage: "/images/countries/musact.png",
        blurb: "Household and general roles across Oman, depending on current demand.",
        active: true,
    },
];
function getDestinationBySlug(slug) {
    return exports.destinations.find((d) => d.slug === slug);
}
// Kept as-is: this powers the existing homepage JobCategories grid.
exports.jobCategories = [
    { title: "Caregivers (Qatar)", category: "Caregiving", image: "/images/jobs/caregiver.png" },
    { title: "Men Caregivers", category: "Caregiving", image: "/images/jobs/mencaregivers.png" },
    { title: "Cooks & Kitchen Assistants", category: "Hospitality", image: "/images/jobs/cheef.png" },
    { title: "Cooks", category: "Hospitality", image: "/images/jobs/cook.png" },
    { title: "House Maids", category: "Household", image: "/images/jobs/cleaner.png" },
    { title: "House Maids (Gulf)", category: "Household", image: "/images/jobs/cleanerdesign2.png" },
    { title: "Cleaners (Male)", category: "Cleaning", image: "/images/jobs/mencleaners.png" },
    { title: "Muslim Girl Driver", category: "Driving", image: "/images/jobs/drivers.png" },
    { title: "Muslim Driver", category: "Driving", image: "/images/jobs/driverslady.png" },
    {
        title: "Cleaner + Driver",
        category: "Cleaning & Driving",
        image: "/images/jobs/combined_cleanerdriverfemale.png",
    },
    { title: "Security Guards", category: "Security", image: "/images/jobs/mensecurityofficers.png" },
    { title: "General Roles", category: "Various", image: "/images/jobs/men.png" },
    { title: "Warehouse Helpers", category: "Warehouse", image: "/images/jobs/warehosue.png" },
];
const QATAR_BENEFITS = [
    "Accommodation provided",
    "Food provided",
    "Health insurance provided",
    "Off days as per employer agreement",
    "Vacation as per Qatar Labour Law",
];
exports.jobs = [
    {
        slug: "house-help-experienced-cooks-qatar",
        title: "House Help — Experienced Cooks",
        countrySlug: "qatar",
        country: "Qatar",
        category: "Household",
        salary: "1,200 QAR",
        experience: "Experienced cooks",
        benefits: QATAR_BENEFITS,
        image: "/images/jobs/cheef.png",
        status: "active",
    },
    {
        slug: "house-help-first-time-qatar",
        title: "House Help — First Time",
        countrySlug: "qatar",
        country: "Qatar",
        category: "Household",
        salary: "900 – 1,000 QAR",
        experience: "First-time applicants",
        benefits: QATAR_BENEFITS,
        image: "/images/jobs/cleaner.png",
        status: "active",
    },
    {
        slug: "house-drivers-qatar",
        title: "House Drivers",
        countrySlug: "qatar",
        country: "Qatar",
        category: "Driving",
        salary: "1,200 QAR during training · 1,600 QAR after training",
        note: "Training applies for this role: 1,200 QAR during training, 1,600 QAR after training.",
        benefits: QATAR_BENEFITS,
        image: "/images/jobs/drivers.png",
        status: "active",
    },
    {
        slug: "nannys-qatar",
        title: "Nannys",
        countrySlug: "qatar",
        country: "Qatar",
        category: "Childcare",
        salary: "1,200 – 1,400 QAR",
        benefits: QATAR_BENEFITS,
        image: "/images/jobs/driverslady.png",
        status: "active",
    },
    {
        slug: "home-tutors-qatar",
        title: "Home Tutors",
        countrySlug: "qatar",
        country: "Qatar",
        category: "Education",
        salary: "1,500 – 1,600 QAR",
        benefits: QATAR_BENEFITS,
        image: "/images/jobs/men.png",
        status: "active",
    },
    {
        slug: "caregivers-qatar",
        title: "Caregivers",
        countrySlug: "qatar",
        country: "Qatar",
        category: "Caregiving",
        salary: "1,500 QAR",
        benefits: QATAR_BENEFITS,
        image: "/images/jobs/caregiver.png",
        status: "active",
    },
    {
        slug: "beauticians-qatar",
        title: "Beauticians",
        countrySlug: "qatar",
        country: "Qatar",
        category: "Beauty",
        salary: "1,500 – 1,600 QAR",
        benefits: QATAR_BENEFITS,
        image: "/images/jobs/mencaregivers.png",
        status: "active",
    },
];
function getJobBySlug(slug) {
    return exports.jobs.find((j) => j.slug === slug);
}
function getActiveJobs() {
    return exports.jobs.filter((j) => j.status === "active");
}
function getJobsByCountrySlug(countrySlug) {
    return getActiveJobs().filter((j) => j.countrySlug === countrySlug);
}
/** Destination whose name, slug or alias appears in free text (chat / search). */
function findDestinationInText(text) {
    const t = text.toLowerCase();
    return exports.destinations.find((d) => [d.name.toLowerCase(), ...d.aliases].some((a) => new RegExp(`\\b${a}\\b`).test(t)));
}
/** Keywords people use for each listed role. Keyed by job slug. */
const JOB_KEYWORDS = {
    "house-help-experienced-cooks-qatar": ["cook", "cooks", "chef", "kitchen", "house help", "housemaid", "maid"],
    "house-help-first-time-qatar": ["first time", "first-time", "no experience", "beginner", "house help", "housemaid", "maid"],
    "house-drivers-qatar": ["driver", "drivers", "driving"],
    "nannys-qatar": ["nanny", "nannys", "nannies", "childcare", "babysitter"],
    "home-tutors-qatar": ["tutor", "tutors", "teacher", "teaching"],
    "caregivers-qatar": ["caregiver", "caregivers", "carer", "elderly care"],
    "beauticians-qatar": ["beautician", "beauticians", "beauty", "salon", "makeup"],
};
const SEARCH_STOP = new Set([
    "jobs", "job", "find", "show", "want", "work", "working", "abroad", "available", "opportunities", "opportunity",
    "vacancy", "vacancies", "with", "from", "about", "have", "does", "what", "which", "where", "need", "looking", "kenya", "kenyans",
]);
/** ACTIVE jobs whose role keywords appear (as whole words) in free text, scoped to a destination if one is named. */
function detectJobsInText(text) {
    const t = text.toLowerCase();
    const dest = findDestinationInText(t);
    return getActiveJobs().filter((j) => (!dest || j.countrySlug === dest.slug) &&
        (JOB_KEYWORDS[j.slug] ?? []).some((k) => new RegExp(`\\b${k}\\b`).test(t)));
}
/** Natural-language job search over ACTIVE jobs only. Never invents results. */
function searchJobs(query) {
    const q = query.toLowerCase().trim();
    if (!q)
        return getActiveJobs();
    const byKeyword = detectJobsInText(q);
    if (byKeyword.length)
        return byKeyword;
    const dest = findDestinationInText(q);
    const pool = dest ? getJobsByCountrySlug(dest.slug) : getActiveJobs();
    const words = q.split(/[^a-z]+/).filter((w) => w.length > 3 && !SEARCH_STOP.has(w));
    const byTitle = pool.filter((j) => {
        const parts = `${j.title} ${j.category}`.toLowerCase().split(/[^a-z]+/);
        return words.some((w) => parts.includes(w));
    });
    if (byTitle.length)
        return byTitle;
    return dest ? pool : [];
}
function jobApplyHref(job) {
    return `/apply?country=${encodeURIComponent(job.country)}&job=${encodeURIComponent(job.title)}`;
}
function destinationApplyHref(d) {
    return `/apply?country=${encodeURIComponent(d.name)}`;
}
/** Package Ajira Majuu has confirmed for the Qatar roles (shared across Qatar jobs). */
exports.QATAR_CONFIRMED_BENEFITS = QATAR_BENEFITS;
exports.RECRUITMENT_PROCESS = [
    { step: "Application", detail: "You apply for an opportunity — no account required." },
    { step: "Screening", detail: "Our recruitment team reviews your details and experience." },
    { step: "Interview", detail: "Qualifying candidates are interviewed, where the role requires it." },
    { step: "Documentation", detail: "We guide you through the documents your specific opportunity needs." },
    { step: "Medical / required checks", detail: "Completed where required for your destination and role." },
    { step: "Pre-departure preparation", detail: "Briefing and preparation ahead of travel." },
    { step: "Deployment", detail: "You travel to begin the confirmed opportunity." },
];
