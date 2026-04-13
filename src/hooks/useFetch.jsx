import { useState, useEffect } from 'react';
import dbData from '../data.js';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      console.log(`Fetching data for: ${url}`);
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        let localData = null;
        if (url.includes('articles') || url === 'articles') {
          localData = { data: dbData.articles };
        } else if (url.includes('videos') || url === 'videos') {
          localData = dbData.videos;
        }
        
        if (localData) {
          setData(localData);
          setIsLoading(false);
          console.log('Data fetched successfully from local db.json:', localData);
        } else {
          throw new Error(`No local data mapping found for: ${url}`);
        }
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        console.error('Fetch error:', err);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
