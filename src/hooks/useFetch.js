import { useEffect, useState } from "react";

export function useFetch(url, dependency = "") {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: true,
    dependency,
  });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function load() {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Could not load ${url}: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setState({ data, error: null, loading: false, dependency });
      } catch (fetchError) {
        if (fetchError.name === "AbortError") {
          return;
        }
        setState({ data: null, error: fetchError.message, loading: false, dependency });
      } finally {
        if (active) {
          setState((current) => ({ ...current, loading: false, dependency }));
        }
      }
    }

    load();
    return () => {
      active = false;
      controller.abort();
    };
  }, [url, dependency]);

  return {
    data: state.data,
    error: state.dependency === dependency ? state.error : null,
    loading: state.loading || state.dependency !== dependency,
  };
}