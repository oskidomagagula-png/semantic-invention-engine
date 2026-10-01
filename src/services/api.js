const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

export const generateIdeas = async (query, count = 5) => {
  const response = await fetch(`${API_BASE_URL}/api/generate-ideas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, count }),
  });
  return handleResponse(response);
};

export const mineQuery = async (query) => {
  const response = await fetch(`${API_BASE_URL}/api/mine`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  return handleResponse(response);
};

export const scoreIdea = async (scenario, concepts, domain) => {
  const response = await fetch(`${API_BASE_URL}/api/score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scenario, concepts, domain }),
  });
  return handleResponse(response);
};

export const checkPatents = async (scenario, concepts) => {
  const response = await fetch(`${API_BASE_URL}/api/patent-match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scenario, concepts }),
  });
  return handleResponse(response);
};
