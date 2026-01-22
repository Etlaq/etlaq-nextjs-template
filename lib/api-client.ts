/**
 * Generic API client wrapper with timeout, error handling, and retry logic
 */

export interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export class ApiClientError extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
  }
}

/**
 * Fetch with timeout support
 */
async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { timeout = 30000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Sleep helper for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generic API client with retry logic
 */
export async function apiClient<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { retries = 0, retryDelay = 1000, ...fetchOptions } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, fetchOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiClientError(
          errorData.error || errorData.message || `Request failed with status ${response.status}`,
          response.status,
          errorData.code
        );
      }

      return await response.json();
    } catch (error) {
      lastError = error as Error;

      // Don't retry on client errors (4xx)
      if (error instanceof ApiClientError && error.status && error.status >= 400 && error.status < 500) {
        throw error;
      }

      // Don't retry on abort
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiClientError('Request timeout', 408, 'TIMEOUT');
      }

      // Wait before retrying
      if (attempt < retries) {
        await sleep(retryDelay * (attempt + 1)); // Exponential backoff
      }
    }
  }

  throw lastError || new ApiClientError('Request failed', 500);
}

/**
 * Convenience methods
 */
export const api = {
  get: <T>(url: string, options?: FetchOptions) =>
    apiClient<T>(url, { ...options, method: 'GET' }),

  post: <T>(url: string, data: unknown, options?: FetchOptions) =>
    apiClient<T>(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
    }),

  put: <T>(url: string, data: unknown, options?: FetchOptions) =>
    apiClient<T>(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
    }),

  delete: <T>(url: string, options?: FetchOptions) =>
    apiClient<T>(url, { ...options, method: 'DELETE' }),
};
