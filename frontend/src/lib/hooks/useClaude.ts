import { useState, useCallback } from 'react';
import { ClaudeService, ClaudeMessage, ClaudeResponse } from '../services/claude';

export interface UseClaudeOptions {
  context?: string;
  onError?: (error: string) => void;
}

export function useClaude(options: UseClaudeOptions = {}) {
  const [messages, setMessages] = useState<ClaudeMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const claudeService = ClaudeService.getInstance();
      const response: ClaudeResponse = await claudeService.sendMessage(message, options.context);

      if (response.error) {
        throw new Error(response.error);
      }

      setMessages(prevMessages => [...prevMessages, ...response.messages]);
      return response.messages;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      options.onError?.(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages
  };
}
