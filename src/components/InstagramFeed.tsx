import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import homeImage from '../assets/home.webp'; // Re-using an existing image as placeholder

const placeholderPosts = [
  { id: 1, image: homeImage, likes: 234, comments: 15 },
  { id: 2, image: 'https://via.placeholder.com/300x300.webp?text=Jean+Style+2', likes: 189, comments: 22 },
  { id: 3, image: 'https://via.placeholder.com/300x300.webp?text=Jean+Style+3', likes: 301, comments: 45 },
  { id: 4, image: 'https://via.placeholder.com/300x300.webp?text=Jean+Style+4', likes: 250, comments: 18 },
];

const InstagramFeed: React.FC = () => {
  return (
    <div className="bg-blanco-hueso py-16 lg:py-24 border-t border-gris-oscuro/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight uppercase text-gris-oscuro">
          Seguinos en Instagram
        </h2>
        <a 
          href="https://www.instagram.com/denimrosario" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-2xl text-gris-oscuro/70 mt-2 block hover:text-gris-oscuro font-semibold transition-colors"
        >
          @denimrosario
        </a>
      </div>
    </div>
  );
};

export default InstagramFeed;
