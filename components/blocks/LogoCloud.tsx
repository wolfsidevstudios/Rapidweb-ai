import React from 'react';

export interface LogoCloudProps {
  title: string;
  logos: string[];
}

const LogoCloud: React.FC<LogoCloudProps> = ({ title, logos }) => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wider">{title}</p>
        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
          {logos.map((logo, index) => (
            <div key={index} className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img className="h-12" src={logo} alt={`Logo ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCloud;
