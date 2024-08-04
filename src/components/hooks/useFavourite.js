import { useContext, useCallback, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../shared/apiConfig";

const useFavourite = () => {
  const { user, setUser } = useContext(AuthContext);
  const [favouritePokemons, setFavouritePokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavouritePokemons = useCallback(async () => {
    if (!user) {
      setFavouritePokemons([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/users/${user.id}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setFavouritePokemons(data.favourites);
    } catch (err) {
      console.error("Error while fetching favourite Pokémon data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavouritePokemons();
  }, [fetchFavouritePokemons]);

  const toggleFavourite = useCallback(
    async (favouritePokemon) => {
      const isAlreadyFavourite = user.favourites.some(
        (pokemon) => pokemon.id === favouritePokemon.id
      );

      const newFavourites = isAlreadyFavourite
        ? user.favourites.filter(
            (pokemon) => pokemon.id !== favouritePokemon.id
          )
        : [...user.favourites, favouritePokemon];

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
        setUser(user);
        setError(error);
      } finally {
        fetchFavouritePokemons();
      }
    },
    [user, setUser, fetchFavouritePokemons]
  );

  return { toggleFavourite, favouritePokemons, loading, error };
};

export default useFavourite;
