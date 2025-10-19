import React from 'react';

export interface NavbarProps {
  logoText: string;
  links: { text: string; href: string }[];
  buttonText: string;
}

const Navbar: React.FC<NavbarProps> = ({ logoText, links, buttonText }) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl text-indigo-600">{logoText}</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link) => (
                <a key={link.text} href={link.href} className="text-gray-500 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  {link.text}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <button className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
