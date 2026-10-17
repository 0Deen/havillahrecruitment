import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { jobs } from '@/data/jobs';
const paths = ['', '/jobs', '/apply', '/destinations', '/services', '/employers', '/employers/request-talent', '/about', '/contact', '/resources', '/faq', '/safety', '/candidate-safety', '/how-it-works', '/career-guides', '/privacy-policy', '/terms', '/complaints'];
export default function sitemap(): MetadataRoute.Sitemap {
 const now = new Date();
 return [...paths.map(path => ({ url: `${siteConfig.url}${path}`, lastModified: now, changeFrequency: 'monthly' as const, priority: path === '' ? 1 : ['/jobs','/apply','/contact'].includes(path) ? 0.9 : 0.7 })), ...jobs.map(job => ({ url: `${siteConfig.url}/jobs/${job.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 }))];
}
