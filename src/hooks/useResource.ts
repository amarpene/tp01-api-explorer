import { useEffect, useRef, useState } from "react";

interface UseResourceResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useResource<T>(
  query: string,
  fetchResource: (
    query: string,
    signal: AbortSignal
  ) => Promise<T>
): UseResourceResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cache = useRef<{
    query: string;
    data: T;
  } | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadResource = async () => {
      if (!query.trim()) {
        setData(null);
        setError(null);
        setLoading(false);
        return;
      }

      if (cache.current?.query === query) {
        setData(cache.current.data);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await fetchResource(
          query,
          controller.signal
        );

        if (controller.signal.aborted) {
          return;
        }

        cache.current = {
          query,
          data: result,
        };

        setData(result);
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Une erreur inconnue est survenue.");
        }

        setData(null);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void loadResource();

    return () => {
      controller.abort();
    };
  }, [query, fetchResource]);

  return {
    data,
    loading,
    error,
  };
}
