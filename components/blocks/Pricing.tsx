import React from 'react';

const defaultTiers = [
  {
    name: 'Starter',
    price: '29',
    description: 'For small teams just getting started.',
    features: ['5 Projects', 'Basic Analytics', '24/7 Support', '10GB Storage'],
    cta: 'Choose Starter',
    popular: false,
  },
  {
    name: 'Pro',
    price: '99',
    description: 'For growing businesses that need more power.',
    features: ['25 Projects', 'Advanced Analytics', 'Priority Support', '100GB Storage', 'Team Collaboration'],
    cta: 'Choose Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with custom needs.',
    features: ['Unlimited Projects', 'Custom Analytics', 'Dedicated Support', 'Unlimited Storage', 'SSO & Security'],
    cta: 'Contact Sales',
    popular: false,
  },
];

interface Tier {
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
    popular: boolean;
}

interface PricingProps {
    title?: string;
    subtitle?: string;
    pricingTiers?: Tier[];
}

const CheckIcon: React.FC<{className?:string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
)

const Pricing: React.FC<PricingProps> = ({
    title = 'The right price for you, whoever you are',
    subtitle = 'Simple, transparent pricing that scales with your needs. No hidden fees.',
    pricingTiers = defaultTiers
}) => {
  return (
    <div className="bg-gray-50 py-12 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Pricing</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            {subtitle}
          </p>
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {pricingTiers.slice(0, 3).map((tier) => (
            <div key={tier.name} className={`flex flex-col rounded-lg shadow-lg overflow-hidden ${tier.popular ? 'border-2 border-indigo-500' : ''}`}>
              <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                <div>
                  <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wider uppercase bg-indigo-100 text-indigo-600">
                    {tier.name}
                  </h3>
                  {tier.popular && <span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800">Most popular</span>}
                </div>
                <div className="mt-4 flex items-baseline text-6xl font-extrabold text-gray-900">
                  {tier.price !== 'Custom' && !tier.price.startsWith('$') && <span className="text-4xl mr-1">$</span>}
                  {tier.price}
                  {tier.price !== 'Custom' && <span className="text-2xl font-medium text-gray-500">/mo</span>}
                </div>
                <p className="mt-5 text-lg text-gray-500">{tier.description}</p>
              </div>
              <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
                <ul role="list" className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckIcon className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="ml-3 text-base text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className={`w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md ${tier.popular ? 'text-white bg-indigo-600 hover:bg-indigo-700' : 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200'}`}
                  >
                    {tier.cta}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;