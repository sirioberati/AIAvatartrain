export interface TrainedModel {
  id: string;
  name: string;
  slug: string;
  triggerWord: string;
  createdAt: string;
  thumbnail: string;
  status: 'ready' | 'training' | 'failed';
  progress?: number;
}

export const demoModels: TrainedModel[] = [
  {
    id: '1',
    name: 'Cyberpunk Avatar',
    slug: 'cyberpunk-avatar',
    triggerWord: 'cyber_me',
    createdAt: '2024-03-15',
    thumbnail: 'https://images.unsplash.com/photo-1614729939124-032d1e6d3f14?w=400&q=80',
    status: 'ready'
  },
  {
    id: '2',
    name: 'Anime Style',
    slug: 'anime-style',
    triggerWord: 'anime_portrait',
    createdAt: '2024-03-14',
    thumbnail: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&q=80',
    status: 'ready'
  },
  {
    id: '3',
    name: 'Fantasy Character',
    slug: 'fantasy-character',
    triggerWord: 'fantasy_me',
    createdAt: '2024-03-13',
    thumbnail: 'https://images.unsplash.com/photo-1639628735078-ed2f038a193e?w=400&q=80',
    status: 'training',
    progress: 75
  }
];