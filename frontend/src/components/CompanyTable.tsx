import React from 'react';
import { Company } from '../types/company';

interface Props {
  companies: Company[];
  isLoading: boolean;
}

export const CompanyTable: React.FC<Props> = ({ companies, isLoading }) => {
  if (isLoading) {
    return <div className="w-full p-4 text-center">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {companies.map((company) => (
            <tr key={company.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{company.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{company.domain}</td>
              <td className="px-6 py-4">{company.description || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(company.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button className="text-blue-600 hover:text-blue-900">Analyze</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};