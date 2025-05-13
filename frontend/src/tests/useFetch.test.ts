import { renderHook, waitFor } from '@testing-library/react';
import { useState, useEffect } from 'react';

// A simple mock useFetch hook for demonstration
function useFetch<T>(url: string): { data: T | null; loading: boolean; error: string | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    // Simulate fetch
    setTimeout(() => {
      if (cancelled) return;
      if (url === '/success') {
        setData({ message: 'ok' } as T);
        setLoading(false);
      } else {
        setError('Not found');
        setLoading(false);
      }
    }, 100);

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

describe('useFetch', () => {
  it('returns data on success', async () => {
    const { result } = renderHook(() => useFetch<{ message: string }>('/success'));
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual({ message: 'ok' });
    expect(result.current.error).toBeNull();
  });

  it('returns error on failure', async () => {
    const { result } = renderHook(() => useFetch('/fail'));
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Not found');
  });
});