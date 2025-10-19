import React from 'react';

export interface StatsProps {
  stats: { value: string; label: string }[];
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="bg-gray-50 pt-12 sm:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={stat.label} className={`flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 ${index !== stats.length - 1 ? 'sm:border-r' : ''}`}>
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{stat.label}</dt>
                <dd className="order-1 text-5xl font-extrabold text-indigo-600">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Stats;
