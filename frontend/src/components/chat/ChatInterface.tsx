import React, { useState } from 'react';
import { useClaude } from '../../lib/hooks/useClaude';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { ScrollArea } from '../ui/scroll-area';
import { Card } from '../ui/card';

export interface ChatInterfaceProps {
  context?: string;
  placeholder?: string;
  className?: string;
}

export function ChatInterface({
  context,
  placeholder = 'Ask me about company analysis...',
  className = ''
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const { messages, isLoading, error, sendMessage } = useClaude({ context });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const currentInput = input;
    setInput('');
    await sendMessage(currentInput);
  };

  return (
    <Card className={`flex flex-col h-full ${className}`}>
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.role === 'assistant'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-muted'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
          {error && (
            <div className="p-4 rounded-lg bg-destructive text-destructive-foreground">
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="flex-grow"
            rows={1}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
