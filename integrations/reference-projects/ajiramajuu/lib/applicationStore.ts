import type { ApplicationInput, ApplicationStatus } from "./applications";

/**
 * Persistence boundary for applications.
 *
 * TODAY: this project has no database, so the delivered record is the
 * Resend email to the recruitment team (with documents attached). That is
 * stated honestly on the success screen — the reference is real and unique,
 * but there is no queryable store yet.
 *
 * LATER: implement `ApplicationStore` against Postgres / Supabase / Prisma
 * and replace `emailOnlyStore`. Nothing else in the app needs to change.
 * Applicants never need an account: lookups are done by staff using the
 * reference.
 */
export interface StoredApplication {
  applicationId: string; // the AJM-YYYY-XXXXX reference
  candidate: ApplicationInput;
  destination: string;
  job: string;
  status: ApplicationStatus;
  documentNames: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationStore {
  save(app: StoredApplication): Promise<void>;
  getByReference?(reference: string): Promise<StoredApplication | null>;
  updateStatus?(reference: string, status: ApplicationStatus): Promise<void>;
}

export const emailOnlyStore: ApplicationStore = {
  async save(app) {
    // Deliberately logs no personal data — only the reference and sizes.
    console.log(`[applications] ${app.applicationId} received (${app.documentNames.length} document(s))`);
  },
};

export const applicationStore: ApplicationStore = emailOnlyStore;
