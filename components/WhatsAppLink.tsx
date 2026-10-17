import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site';
export default function WhatsAppLink({label='Chat with Havillah on WhatsApp',message='Hello Havillah Recruitment Agency. I would like to enquire about your recruitment services.'}:{label?:string;message?:string}) {
 const href = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
 return <a className="button button-primary" href={href} target="_blank" rel="noopener noreferrer"><MessageCircle size={17}/>{label}</a>;
}
