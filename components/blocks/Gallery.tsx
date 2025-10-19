
import React from 'react';
import { BlockComponentProps } from '../../types';

const images = [
  'https://picsum.photos/id/10/600/600',
  'https://picsum.photos/id/20/600/600',
  'https://picsum.photos/id/30/600/600',
  'https://picsum.photos/id/40/600/600',
  'https://picsum.photos/id/50/600/600',
  'https://picsum.photos/id/60/600/600',
];

const Gallery: React.FC<BlockComponentProps> = () => {
  return (
    <div className="bg-white py-12 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Work</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A Glimpse into Our Portfolio
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Browse through a selection of our finest work, showcasing our creativity and attention to detail.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src, index) => (
            <div key={index} className="aspect-w-1 aspect-h-1">
              <img className="object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300" src={src} alt={`Gallery image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
