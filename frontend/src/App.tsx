import { ChatInterface } from './components/chat/ChatInterface';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Company Analyzer</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Other dashboard components will go here */}
          
          {/* Claude Chat Interface */}
          <div className="md:col-span-2 h-[600px]">
            <ChatInterface
              context="You are an AI assistant specialized in company analysis. Help users understand financial data, market trends, and business metrics."
              placeholder="Ask about company analysis, financial metrics, or market trends..."
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
