export const site = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
};
export function whatsappUrl() {
  const number = site.whatsapp.replace(/\D/g, '');
  return number
    ? `https://wa.me/${number}?text=${encodeURIComponent('¡Hola YATSAR! Quiero conversar sobre mi proyecto web.')}`
    : null;
}
export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  kind: 'natura' | 'studio' | 'store';
  status: string;
  url?: string;
  image?: string;
  mobileImage?: string;
  imageAlt?: string;
};
export const projects: Project[] = [
  {
    id: 'natura',
    name: 'Natura Ludmi',
    category: 'CATÁLOGO DIGITAL',
    description:
      'Una propuesta de catálogo para explorar productos de belleza de una forma simple y cercana.',
    kind: 'natura',
    status: 'Demo / maqueta',
    url: 'https://natura-ludmi.vercel.app/',
    image: '/projects/natura-desktop.webp',
    mobileImage: '/projects/natura-mobile.webp',
    imageAlt:
      'Captura de la demo Natura Ludmi: portada floral, categorías y catálogo de fragancias.',
  },
  {
    id: 'studio',
    name: 'Espacio para tu marca',
    category: 'WEB EMPRESARIAL',
    description:
      'Una dirección visual de ejemplo para una marca con algo propio para contar.',
    kind: 'studio',
    status: 'Concepto · placeholder',
  },
  {
    id: 'store',
    name: 'Tu próxima tienda',
    category: 'E-COMMERCE',
    description:
      'Un espacio de muestra para imaginar la próxima experiencia de compra de tu negocio.',
    kind: 'store',
    status: 'Concepto · placeholder',
  },
];
export const services = [
  {
    number: '01',
    title: 'Páginas empresariales',
    text: 'Tu negocio, bien presentado. Una web clara, rápida y con una identidad que te represente.',
    tags: 'IDENTIDAD · PRESENCIA · CONFIANZA',
    icon: 'web',
  },
  {
    number: '02',
    title: 'Tiendas online',
    text: 'Transformá tus productos en una experiencia de compra simple, desde cualquier dispositivo.',
    tags: 'PRODUCTOS · COMPRA · EXPERIENCIA',
    icon: 'store',
  },
  {
    number: '03',
    title: 'Catálogos digitales',
    text: 'Todo lo que ofrecés, en un solo lugar. Fácil de explorar y listo para compartir con tus clientes.',
    tags: 'CATÁLOGO · CONSULTAS · CONEXIÓN',
    icon: 'catalog',
  },
  {
    number: '04',
    title: 'Soluciones a medida',
    text: 'Cuando una plantilla no alcanza, construimos herramientas pensadas para tu forma de trabajar.',
    tags: 'INTEGRACIONES · HERRAMIENTAS · IDEAS',
    icon: 'code',
  },
];
