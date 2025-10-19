import React from 'react';

export interface GalleryProps {
  title: string;
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ title, images }) => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">{title}</h2>
        <div className="mt-10 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((src, index) => (
            <div key={index} className="aspect-w-1 aspect-h-1">
              <img className="object-cover shadow-lg rounded-lg" src={src} alt={`Gallery image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
