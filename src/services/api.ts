// FitShop Centralized API Service
// Reads API Base URL from Vite environment variable (VITE_API_URL)
// Falls back to http://localhost:5000/api in development

export const API_BASE_URL: string = (
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ||
  'http://localhost:5000/api'
).replace(/\/+$/, ''); // Strip trailing slashes

/**
 * Returns the fully qualified URL for a given API endpoint.
 * Accepts '/api/products', 'api/products', and 'products'.
 */
export function getApiUrl(endpoint: string): string {
  let cleanEndpoint = endpoint.trim();
  if (cleanEndpoint.startsWith('/api/')) {
    cleanEndpoint = cleanEndpoint.substring(5);
  } else if (cleanEndpoint.startsWith('api/')) {
    cleanEndpoint = cleanEndpoint.substring(4);
  } else if (cleanEndpoint.startsWith('/')) {
    cleanEndpoint = cleanEndpoint.substring(1);
  }
  return `${API_BASE_URL}/${cleanEndpoint}`;
}

/**
 * Global API Fetch Wrapper
 * Automatically handles API_BASE_URL, JSON headers, and Auth Bearer token.
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const url = getApiUrl(endpoint);
  const token = localStorage.getItem('fitshop_token') || 'fitshop-jwt-usr-1-customer';

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const mergedHeaders = {
    ...defaultHeaders,
    ...(options.headers as Record<string, string> || {}),
  };

  return fetch(url, {
    ...options,
    headers: mergedHeaders,
  });
}

// Seamless API routing interceptor for browser environment:
// Automatically rewrites any relative fetch call starting with '/api/' to the configured API_BASE_URL
if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
  const originalFetch = window.fetch;
  window.fetch = function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    if (typeof input === 'string') {
      if (input.startsWith('/api/') || input === '/api') {
        input = getApiUrl(input);
      }
    }
    return originalFetch.call(this, input, init);
  };

  (window as any).FitApi = {
    BASE_URL: API_BASE_URL,
    getUrl: getApiUrl,
    fetch: apiFetch,
  };
}

export default {
  BASE_URL: API_BASE_URL,
  getUrl: getApiUrl,
  fetch: apiFetch,
};
