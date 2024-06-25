import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../shared/apiConfig";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(null);
        setPageInfo(null);
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        if (data.results) {
          setPageInfo(data);
          const promises = data.results.map(async ({ url }) => {
            const response = await fetch(url);
            return response.json();
          });
          const details = await Promise.all(promises);

          const statsResponse = await fetch(`${BASE_URL}/users/${user.id}`);
          const statsData = await statsResponse.json();
          const combinedData = details.map((pokemon) => ({
            ...pokemon,
            ...statsData.stats.find((stats) => stats.id === pokemon.id),
          }));
          setData(combinedData);
        } else {
          setData(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error, pageInfo };
};

export default useFetch;
