import React from 'react';

export interface FooterProps {
  text: string;
  links: { text: string; href: string }[];
}

const Footer: React.FC<FooterProps> = ({ text, links }) => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {links.map((link) => (
            <a key={link.text} href={link.href} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">{link.text}</span>
              {link.text}
            </a>
          ))}
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">{text}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
