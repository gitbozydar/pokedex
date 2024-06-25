import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";

const PokemonList = ({
  data,
  isLoading,
  createdLoading,
  error,
  onSelectPokemon,
  firstPokemon,
  secondPokemon,
}) => {
  const handleSelect = (pokemon) => {
    onSelectPokemon(pokemon);
  };

  if (isLoading || createdLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Weight</TableCell>
          <TableCell>Height</TableCell>
          <TableCell>Base Experience</TableCell>
          <TableCell>Select</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data ? (
          data.map((pokemon, index) => (
            <TableRow key={index}>
              <TableCell>
                <Box className="flex items-center gap-2">
                  <img
                    className="w-11"
                    src={
                      pokemon.sprites
                        ? pokemon.sprites.front_default
                        : pokemon.img
                    }
                    alt={pokemon.name}
                  />
                  {pokemon.name}
                </Box>
              </TableCell>
              <TableCell>{pokemon.weight}</TableCell>
              <TableCell>{pokemon.height}</TableCell>
              <TableCell>{pokemon.base_experience}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => handleSelect(pokemon)}
                  disabled={
                    (firstPokemon?.id || secondPokemon?.id) === pokemon.id
                  }
                >
                  {(firstPokemon?.id || secondPokemon?.id) === pokemon.id
                    ? "Selected"
                    : "Select"}
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>No data found.</TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PokemonList;
