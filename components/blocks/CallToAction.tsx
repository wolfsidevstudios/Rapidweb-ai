import React from 'react';

interface CallToActionProps {
  headline1?: string;
  headline2?: string;
  subtitle?: string;
  ctaText?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({ 
  headline1 = 'Ready to dive in?', 
  headline2 = 'Start your free trial today.', 
  subtitle = 'No credit card required. Instantly access all features and build your dream website in minutes.', 
  ctaText = 'Sign up for free'
}) => {
  return (
    <div className="bg-indigo-700">
      <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">{headline1}</span>
          <span className="block">{headline2}</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-indigo-200">
          {subtitle}
        </p>
        <a
          href="#"
          className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
};

export default CallToAction;