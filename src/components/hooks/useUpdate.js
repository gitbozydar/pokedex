import { useContext, useState } from "react";

import { BASE_URL } from "../shared/apiConfig";
import { AuthContext } from "../context/AuthContext";

const useUpdate = () => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const updatePokemon = async (pokemonId, updatedPokemonData) => {
    setUpdating(true);
    setError(null);

    try {
      const responseUser = await fetch(`${BASE_URL}/users/${user.id}`);
      const userData = await responseUser.json();
      console.log(userData);

      const updatedCreated = userData.created.map((pokemon) =>
        pokemon.id === pokemonId
          ? { ...pokemon, ...updatedPokemonData }
          : pokemon
      );

      const updatedUserData = {
        ...userData,
        created: updatedCreated,
      };

      const responseUpdate = await fetch(`${BASE_URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      await responseUpdate.json();

      return updatedCreated.find(({ id }) => id === pokemonId);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return { updatePokemon, updating, error };
};

export default useUpdate;
