export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  model: string;
  createdAt: string;
  seed: number;
}

export const demoGenerations: GeneratedImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1543489822-c49534f3271f?w=400&q=80',
    prompt: 'Cyberpunk style portrait with neon lights and urban background',
    model: 'Cyberpunk Avatar',
    createdAt: '2024-03-15',
    seed: 123456
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&q=80',
    prompt: 'Anime style character in a cherry blossom garden',
    model: 'Anime Style',
    createdAt: '2024-03-15',
    seed: 789012
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?w=400&q=80',
    prompt: 'Fantasy portrait with magical elements and glowing effects',
    model: 'Fantasy Character',
    createdAt: '2024-03-14',
    seed: 345678
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?w=400&q=80',
    prompt: 'Cyberpunk character in a futuristic city at night',
    model: 'Cyberpunk Avatar',
    createdAt: '2024-03-14',
    seed: 901234
  }
];