import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DashboardLayout } from './components/DashboardLayout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayout />
    </QueryClientProvider>
  );
}

export default App;