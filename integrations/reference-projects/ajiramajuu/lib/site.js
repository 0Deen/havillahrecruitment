"use strict";
// Single source of truth for company identity + contact details.
// Only details Ajira Majuu has supplied live here. Do not add numbers,
// addresses or social accounts that have not been confirmed by the company.
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAV_MORE = exports.NAV_PRIMARY = exports.COMPANY = exports.SITE_URL = void 0;
exports.SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ajiramajuu.com";
exports.COMPANY = {
    name: "Ajira Majuu",
    legalDescriptor: "Private Overseas Recruitment Agency in Kenya",
    tagline: "Connecting Kenyan Talent to Global Opportunities.",
    swahili: "Njoo, Tusafiri Ughaibuni.",
    phoneDisplay: "+254 115 614 253",
    phoneHref: "tel:+254115614253",
    whatsappNumber: "254115614253",
    primaryEmail: "deen@ajiramajuu.com",
    secondaryEmail: "ajiramajuuh@gmail.com",
    website: "www.ajiramajuu.com",
    address: "Twiga Towers, Murang'a Road, Nairobi",
    addressShort: "Twiga Towers, Murang'a Road, Nairobi",
    country: "Kenya",
};
exports.NAV_PRIMARY = [
    { href: "/", label: "Home", icon: "home" },
    { href: "/jobs", label: "Jobs", icon: "briefcase" },
    { href: "/destinations", label: "Destinations", icon: "globe" },
    { href: "/apply", label: "Apply", icon: "send" },
    { href: "/contact", label: "Contact", icon: "phone" },
];
exports.NAV_MORE = [
    { href: "/assistant", label: "AI Assistant", icon: "sparkles", hint: "Ask anything about working abroad" },
    { href: "/how-it-works", label: "How It Works", icon: "route", hint: "From application to deployment" },
    { href: "/about", label: "About Ajira Majuu", icon: "building", hint: "Who we are and what we do" },
    { href: "/resources", label: "Resources", icon: "book", hint: "Guides for candidates" },
    { href: "/faq", label: "FAQ", icon: "help", hint: "Quick answers" },
    { href: "/recruitment-safety", label: "Recruitment Safety", icon: "shield", hint: "Protect yourself from scams" },
    { href: "/for-employers", label: "For Employers", icon: "users", hint: "Request recruitment support" },
];
