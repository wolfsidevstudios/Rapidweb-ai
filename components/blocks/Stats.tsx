import React from 'react';

const defaultStats = [
  { label: 'Websites Launched', value: '10,000+' },
  { label: 'Happy Customers', value: '99.8%' },
  { label: 'Uptime', value: '99.99%' },
  { label: 'Support Tickets Closed', value: '50k+' },
];

interface StatItem {
    label: string;
    value: string;
}

interface StatsProps {
    title?: string;
    subtitle?: string;
    statsList?: StatItem[];
}

const Stats: React.FC<StatsProps> = ({
    title = 'Trusted by thousands of users worldwide',
    subtitle = "We're proud to have built a platform that our customers love and rely on every day.",
    statsList = defaultStats
}) => {
  return (
    <div className="bg-indigo-800 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-xl text-indigo-200 sm:mt-4">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="mt-10 pb-12 bg-indigo-800 sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-indigo-800" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-4">
                {statsList.slice(0, 4).map((stat, index) => (
                  <div key={stat.label} className={`flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 ${index < statsList.length - 1 ? 'sm:border-r' : ''}`}>
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{stat.label}</dt>
                    <dd className="order-1 text-5xl font-extrabold text-indigo-600">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;