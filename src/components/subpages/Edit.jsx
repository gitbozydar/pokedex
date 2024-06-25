import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

import PokemonForm from "../shared/PokemonForm/PokemonForm";
import useCreated from "../hooks/useCreated";
import PokemonCard from "../shared/PokemonCard/PokemonCard";
import useUpdate from "../hooks/useUpdate";

const Edit = () => {
  const [showForm, setShowForm] = useState(false);
  const { createdPokemons, fetchCreated, loading } = useCreated();
  const { updating, updatePokemon } = useUpdate();
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchCreated();
  }, [fetchCreated]);

  useEffect(() => {
    setPokemons(createdPokemons);
  }, [createdPokemons]);

  const handleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleUpdatePokemon = async (id, updatedData) => {
    const updatedPokemon = await updatePokemon(id, updatedData);
    setPokemons((prevPokemons) =>
      prevPokemons.map((pokemon) =>
        pokemon.id === updatedPokemon.id ? updatedPokemon : pokemon
      )
    );
  };

  return (
    <Box className="flex flex-col bg-light-background  dark:bg-dark-background items-center gap-16 w-full p-8">
      <Button
        className="flex w-64 dark:bg-dark-button"
        onClick={handleShowForm}
        variant="contained"
      >
        {!showForm ? "Create Your Pokemon" : "Hide"}
      </Button>
      {showForm && <PokemonForm />}
      {!loading ? (
        <Box className="flex flex-wrap content-center g-2">
          {!updating ? (
            pokemons.map(
              ({ name, weight, height, base_experience, img, id }, index) => (
                <PokemonCard
                  id={id}
                  name={name}
                  weight={weight}
                  height={height}
                  base_experience={base_experience}
                  img={img}
                  key={index}
                  isCreated={true}
                  onUpdatePokemon={handleUpdatePokemon}
                />
              )
            )
          ) : (
            <CircularProgress />
          )}
        </Box>
      ) : (
        <Box>You have no pokemons created.</Box>
      )}
    </Box>
  );
};

export default Edit;
