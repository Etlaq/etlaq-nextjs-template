/**
 * OpenRouter API client for AI chat functionality
 * https://openrouter.ai/docs
 */

import { serverEnv } from '@/lib/env';

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface ChatCompletionResponse {
  id: string;
  model: string;
  choices: Array<{
    message: ChatMessage;
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Check if OpenRouter is configured
 */
export function isOpenRouterConfigured(): boolean {
  return !!serverEnv.OPENROUTER_API_KEY;
}

/**
 * Create a chat completion (non-streaming)
 */
export async function createChatCompletion(
  messages: ChatMessage[],
  options: ChatCompletionOptions = {}
): Promise<ChatCompletionResponse> {
  if (!isOpenRouterConfigured()) {
    throw new Error('OpenRouter API key not configured');
  }

  const {
    model = 'openai/gpt-3.5-turbo',
    temperature = 0.7,
    max_tokens = 1000,
  } = options;

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${serverEnv.OPENROUTER_API_KEY}`,
      'HTTP-Referer': process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
      'X-Title': 'Etlaq App',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens,
      stream: false,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `OpenRouter request failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Create a streaming chat completion
 * Returns a ReadableStream that emits SSE chunks
 */
export async function createStreamingChatCompletion(
  messages: ChatMessage[],
  options: ChatCompletionOptions = {}
): Promise<ReadableStream> {
  if (!isOpenRouterConfigured()) {
    throw new Error('OpenRouter API key not configured');
  }

  const {
    model = 'openai/gpt-3.5-turbo',
    temperature = 0.7,
    max_tokens = 1000,
  } = options;

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${serverEnv.OPENROUTER_API_KEY}`,
      'HTTP-Referer': process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
      'X-Title': 'Etlaq App',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens,
      stream: true,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `OpenRouter request failed: ${response.status}`);
  }

  if (!response.body) {
    throw new Error('No response body');
  }

  return response.body;
}

/**
 * Parse SSE stream chunks
 */
export function parseSSEChunk(chunk: string): string | null {
  const lines = chunk.split('\n');

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6);

      if (data === '[DONE]') {
        return null;
      }

      try {
        const parsed = JSON.parse(data);
        return parsed.choices?.[0]?.delta?.content || '';
      } catch {
        // Ignore parse errors
      }
    }
  }

  return '';
}
