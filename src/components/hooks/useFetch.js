import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../shared/apiConfig";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url);
        const result = await response.json();

        if (result.results) {
          setPageInfo(result);
          const promises = result.results.map(async ({ url }) => {
            const response = await fetch(url);
            return response.json();
          });
          const details = await Promise.all(promises);

          if (isLoggedIn) {
            const statsResponse = await fetch(`${BASE_URL}/users/${user.id}`);
            const statsData = await statsResponse.json();
            const combinedData = details.map((pokemon) => ({
              ...pokemon,
              ...statsData.stats.find((stats) => stats.id === pokemon.id),
            }));
            setData((prevData) => [...prevData, ...combinedData]);
          } else {
            setData((prevData) => [...prevData, ...details]);
          }
        } else {
          setData((prevData) => [...prevData, result]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, user, isLoggedIn]);

  return { data, isLoading, error, pageInfo };
};

export default useFetch;
