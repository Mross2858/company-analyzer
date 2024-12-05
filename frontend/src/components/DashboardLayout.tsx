import React from 'react';
import { CompanyTable } from './CompanyTable';
import { FileUpload } from './FileUpload';
import { DataVisualizations } from './DataVisualizations';
import { useQuery } from 'react-query';
import { companyService } from '../services/api';

export const DashboardLayout = () => {
  const { data: companies = [], isLoading } = useQuery('companies', companyService.getCompanies);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Company Analysis Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <FileUpload />
          <DataVisualizations data={companies} />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <CompanyTable companies={companies} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};