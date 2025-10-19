import React from 'react';

export interface PricingProps {
  title: string;
  plans: { name: string; price: string; features: string[] }[];
}

const Pricing: React.FC<PricingProps> = ({ title, plans }) => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">{title}</h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-white rounded-lg shadow-md p-8 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
              <p className="mt-4 text-4xl font-extrabold text-gray-900">{plan.price}</p>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="ml-3 text-base text-gray-700">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
