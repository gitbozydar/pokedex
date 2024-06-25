import { Box, Card, CardContent, Typography, CardMedia } from "@mui/material";

import useCapital from "../../hooks/useCapital";

const PokemonCardExpansion = ({
  name,
  weight,
  height,
  base_experience,
  abilities,
  stats,
  sprites,
  types,
}) => {
  const capitalName = useCapital(name);

  return (
    <Card className="flex w-full max-w-6xl border border-light-border bg-light-card p-8 dark:border-dark-border dark:bg-dark-card">
      <CardMedia
        component="img"
        alt={name}
        className=" h-auto object-contain"
        sx={{ objectFit: "contain" }}
        image={sprites.other["official-artwork"].front_default}
      />
      <CardContent className="flex flex-col flex-grow ml-4">
        <Typography
          variant="h1"
          className="text-light-primary dark:text-dark-secondary font-bold mb-4"
        >
          {capitalName}
        </Typography>
        <Box className="flex flex-wrap gap-4">
          <Box className="w-full md:w-1/2 lg:w-1/3">
            <Typography className="text-light-primary dark:text-dark-primary">
              Weight: {weight} kg
            </Typography>
          </Box>
          <Box className="w-full md:w-1/2 lg:w-1/3">
            <Typography className="text-light-primary dark:text-dark-primary">
              Height: {height / 10} m
            </Typography>
          </Box>
          <Box className="w-full md:w-1/2 lg:w-1/3">
            <Typography className="text-light-primary dark:text-dark-primary">
              Base Experience: {base_experience}
            </Typography>
          </Box>
          <Box className="w-full">
            <Typography className="font-semibold mb-2 text-light-primary dark:text-dark-primary">
              Abilities:
            </Typography>
            <Typography className="dark:text-dark-primary">
              {abilities.map((ability) => ability.ability.name).join(", ")}
            </Typography>
          </Box>
          <Box className="w-full">
            <Typography className="font-semibold mb-2 text-light-primary dark:text-dark-primary">
              Types:
            </Typography>
            <Typography className="text-light-primary dark:text-dark-primary">
              {types.map((type) => type.type.name).join(", ")}
            </Typography>
          </Box>
          <Box className="w-full">
            <Typography className="font-semibold mb-2 text-light-primary dark:text-dark-primary">
              Stats:
            </Typography>
            {stats.map((stat) => (
              <Typography
                key={stat.stat.name}
                className="text-light-primary dark:text-dark-primary"
              >
                - {stat.stat.name}: {stat.base_stat}
              </Typography>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PokemonCardExpansion;
