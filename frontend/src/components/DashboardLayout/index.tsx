import React from 'react';
import { ClaudeChat } from '@/components/ClaudeChat';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Company Analytics Dashboard</h1>
        
        {/* Claude Chat Integration */}
        <ClaudeChat />
      </div>
    </div>
  );
};
