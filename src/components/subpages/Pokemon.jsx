import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import { POKE_URL } from "../shared/apiConfig";
import PokemonCardExpansion from "../shared/PokemonCard/PokemonCardExpension";

const Pokemon = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(`${POKE_URL}/pokemon/${id}`);

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex justify-center items-center">
        <Typography color="error">
          An error occurred while fetching the data.
        </Typography>
      </Box>
    );
  }

  if (!data) {
    return null;
  }

  const {
    weight,
    name,
    base_experience,
    height,
    abilities,
    sprites,
    stats,
    types,
    cries,
  } = data;

  return (
    <Box className="flex justify-center p-4">
      <PokemonCardExpansion
        name={name}
        weight={weight}
        height={height}
        base_experience={base_experience}
        abilities={abilities}
        stats={stats}
        sprites={sprites}
        types={types}
        cries={cries}
      />
    </Box>
  );
};

export default Pokemon;
