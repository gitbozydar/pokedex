import { useCallback, useContext, useState } from "react";
import { BASE_URL } from "../shared/apiConfig";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

const useCreated = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdPokemons, setCreatedPokemons] = useState([]);
  const { user, setUser } = useContext(AuthContext);

  const createPokemon = useCallback(
    async (newPokemon) => {
      setCreatedPokemons([]);
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
            created: [...user.created, { ...newPokemon, id: uuidv4() }],
          }),
        });
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  const fetchCreated = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/users/${user.id}`);
      const data = await response.json();
      const createdPokemons = data.created;
      setCreatedPokemons(createdPokemons);
    } catch (err) {
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [user]);

  return { fetchCreated, createdPokemons, createPokemon, loading, error };
};
export default useCreated;
