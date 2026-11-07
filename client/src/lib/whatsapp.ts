import { contact } from '@/content/site'

export const waUrl = (message: string) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`
