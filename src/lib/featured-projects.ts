// Edit the cards here. Add a confirmed URL to link to a published site.
export type FeaturedProject = {
  id: string;
  name: string;
  category: string;
  image: string;
  color: string;
  url?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'aj-plus',
    name: 'AJ PLUS',
    category: 'Catálogo comercial',
    image: '/Contenido Grafico/AJ PLUS.png',
    color: '#224d3b',
    url: 'https://ajplus.com.ar',
  },
  {
    id: 'glow-up',
    name: 'GLOW UP',
    category: 'Catálogo de productos',
    image: '/Contenido Grafico/GLOW UP.png',
    color: '#514022',
    url: 'https://glowupimports.com.ar',
  },
  {
    id: 'nnz-home',
    name: 'NNZ HOME',
    category: 'Hogar y tecnología',
    image: '/Contenido Grafico/NNZ HOME.png',
    color: '#665c4e',
    url: 'https://nnzhome.com.ar',
  },
];
