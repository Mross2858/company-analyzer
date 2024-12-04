import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation } from 'react-query';
import { FileUpload } from './components/FileUpload';
import { CompanyTable } from './components/CompanyTable';
import { companyService } from './services/api';

const queryClient = new QueryClient();

function CompanyAnalyzer() {
  const [page, setPage] = useState(1);
  const { data: companies = [], isLoading } = useQuery(
    ['companies', page],
    () => companyService.getCompanies(page)
  );

  const uploadMutation = useMutation(companyService.uploadCompanies, {
    onSuccess: () => {
      queryClient.invalidateQueries('companies');
    },
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Company Analyzer</h1>
          
          <div className="mb-8">
            <FileUpload onUpload={(file) => uploadMutation.mutate(file)} />
          </div>

          <div className="bg-white shadow rounded-lg">
            <CompanyTable 
              companies={companies}
              isLoading={isLoading || uploadMutation.isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CompanyAnalyzer />
    </QueryClientProvider>
  );
}