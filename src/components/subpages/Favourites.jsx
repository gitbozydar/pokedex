import { Box, CircularProgress, Typography } from "@mui/material";
import PokemonCard from "../shared/PokemonCard/PokemonCard";
import useFavourite from "../hooks/useFavourite";

const Favourites = () => {
  const { favouritePokemons, loading } = useFavourite();

  return (
    <Box className="flex flex-wrap w-full justify-center g-2 mt-8 bg-light-background dark:bg-dark-background">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {favouritePokemons.length > 0 ? (
            favouritePokemons.map(({ id, sprites, ...rest }) => (
              <PokemonCard
                key={id}
                id={id}
                img={sprites && sprites.other.dream_world.front_default}
                {...rest}
              />
            ))
          ) : (
            <Typography
              variant="h5"
              className=" text-light-primary dark:text-dark-primary"
            >
              No favourite Pokémons...
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default Favourites;
