import React from 'react';

export interface TeamProps {
  title: string;
  members: { name: string; role: string; imageUrl: string }[];
}

const Team: React.FC<TeamProps> = ({ title, members }) => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">{title}</h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div key={member.name} className="text-center">
              <img className="mx-auto h-40 w-40 rounded-full" src={member.imageUrl} alt={member.name} />
              <h3 className="mt-6 text-lg font-medium text-gray-900">{member.name}</h3>
              <p className="text-indigo-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
