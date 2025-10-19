
import React from 'react';
import { BlockComponentProps } from '../../types';

const people = [
  {
    name: 'Jane Cooper',
    role: 'Co-Founder / CEO',
    imageUrl: 'https://picsum.photos/id/342/500/500',
  },
  {
    name: 'John Smith',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://picsum.photos/id/352/500/500',
  },
  {
    name: 'Emily White',
    role: 'VP of Product',
    imageUrl: 'https://picsum.photos/id/362/500/500',
  },
  {
    name: 'Michael Brown',
    role: 'Lead Designer',
    imageUrl: 'https://picsum.photos/id/372/500/500',
  },
];

const Team: React.FC<BlockComponentProps> = () => {
  return (
    <div className="bg-white py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Meet our team</h2>
          <p className="text-xl text-gray-500">
            We’re a passionate group of designers, engineers, and strategists dedicated to building the future of the web.
          </p>
        </div>
        <ul
          role="list"
          className="mt-12 space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-4 lg:gap-x-8"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="space-y-4">
                <div className="aspect-w-1 aspect-h-1">
                  <img className="object-cover shadow-lg rounded-lg" src={person.imageUrl} alt="" />
                </div>

                <div className="space-y-2">
                  <div className="text-lg leading-6 font-medium space-y-1">
                    <h3>{person.name}</h3>
                    <p className="text-indigo-600">{person.role}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Team;
