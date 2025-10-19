import React from 'react';

interface LogoCloudProps {
    title?: string;
    subtitle?: string;
}

const LogoCloud: React.FC<LogoCloudProps> = ({
    title = "Trusted By",
    subtitle = "The World's Most Innovative Companies"
}) => {
  return (
    <div className="bg-white py-12 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">{title}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {subtitle}
            </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-1 flex justify-center items-center">
            <img className="h-12" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple" />
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <img className="h-12" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg" alt="Mirage" />
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <img className="h-12" src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg" alt="StaticKit" />
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <img className="h-12" src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg" alt="Transistor" />
          </div>
          <div className="col-span-1 flex justify-center items-center col-start-2 md:col-start-auto">
            <img className="h-12" src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg" alt="Workcation" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCloud;