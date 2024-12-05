import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Company } from '../types/company';

interface Props {
  data: Company[];
}

export const DataVisualizations: React.FC<Props> = ({ data }) => {
  const domainCounts = data.reduce((acc, company) => {
    const domain = company.domain.split('.').pop() || 'other';
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(domainCounts).map(([domain, count]) => ({
    domain,
    count,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Domain Distribution</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="domain" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};