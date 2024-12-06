import axios from 'axios';

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClaudeResponse {
  content: string;
  error?: string;
}

export class ClaudeService {
  private static instance: ClaudeService;
  private baseURL: string;
  private apiKey: string;

  private constructor() {
    this.baseURL = import.meta.env.VITE_CLAUDE_API_URL || 'https://api.anthropic.com/v1';
    this.apiKey = import.meta.env.VITE_CLAUDE_API_KEY || '';
  }

  public static getInstance(): ClaudeService {
    if (!ClaudeService.instance) {
      ClaudeService.instance = new ClaudeService();
    }
    return ClaudeService.instance;
  }

  public async sendMessage(message: string, context?: string): Promise<ClaudeResponse> {
    try {
      const messages = [
        ...(context ? [{ role: 'user' as const, content: context }] : []),
        { role: 'user' as const, content: message }
      ];

      const response = await axios.post(
        `${this.baseURL}/messages`,
        {
          model: 'claude-3-sonnet-20240229',
          max_tokens: 4096,
          messages,
          temperature: 0.7,
          system: 'You are an AI assistant specialized in company analysis. Help users understand financial data, market trends, and business metrics.'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01',
            'x-api-key': this.apiKey
          }
        }
      );

      return {
        content: response.data.content[0].text
      };
    } catch (error) {
      console.error('Error calling Claude API:', error);
      return {
        content: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}
