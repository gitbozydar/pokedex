import { useContext, useCallback, useState, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";
import { BASE_URL, POKE_URL } from "../shared/apiConfig";

const useFavourite = () => {
  const { user, setUser } = useContext(AuthContext);
  const [favouritePokemons, setFavouritePokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavouritePokemons = useCallback(async () => {
    setLoading(true);
    setFavouritePokemons([]);
    try {
      if (user && user.favourites.length > 0) {
        const pokemonDataPromises = user.favourites.map(async (id) => {
          const response = await fetch(`${POKE_URL}/pokemon/${id}`);
          return response.json();
        });
        const pokemonData = await Promise.all(pokemonDataPromises);
        setFavouritePokemons(pokemonData);
      }
    } catch (err) {
      console.error("Error while fetching favourite Pokémon data:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavouritePokemons();
  }, [fetchFavouritePokemons]);

  const toggleFavourite = useCallback(
    async (pokemonId) => {
      const newFavourites = user.favourites.includes(pokemonId)
        ? user.favourites.filter((favId) => favId !== pokemonId)
        : [...user.favourites, pokemonId];
      const updatedUser = { ...user, favourites: newFavourites };
      setUser(updatedUser);

      try {
        await fetch(`${BASE_URL}/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });
      } catch (error) {
        setUser({ ...user, favourites: user.favourites });
      } finally {
        fetchFavouritePokemons();
      }
    },
    [user, setUser, fetchFavouritePokemons]
  );

  return { toggleFavourite, favouritePokemons, loading };
};

export default useFavourite;
