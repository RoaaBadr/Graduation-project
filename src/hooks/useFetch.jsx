import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      console.log(`Fetching data from ${url}`);
      try {
        const response = await fetch(url, {
          signal,
          credentials: 'include', // Send cookies with the request
        });
        if (!response.ok) {
          throw new Error(`Could not fetch the data for that resource: ${response.statusText}`);
        }
        const data = await response.json();
        if (!signal.aborted) {
          setData(data);
          setIsLoading(false);
          console.log('Data fetched successfully:', data);
        }
      } catch (err) {
        if (signal.aborted) {
          console.log(err);
          console.log('Fetch aborted');
        } else {
          setError(err.message);
          setIsLoading(false);
          console.error('Fetch error:', err);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
      console.log('Fetch aborted on cleanup');
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
