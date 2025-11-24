export const getApiUrl = (): string => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (import.meta.env.MODE === 'production') return '/';
  return 'http://localhost:3000';
};

export async function apiGet<T>(path: string): Promise<T> {
  const url = `${getApiUrl()}${path}`;
  const res = await fetch(url, { credentials: 'include', headers: { 'Content-Type': 'application/json' }});
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Erro ${res.status} ao acessar ${url}`);
  }
  return res.json() as Promise<T>;
}
