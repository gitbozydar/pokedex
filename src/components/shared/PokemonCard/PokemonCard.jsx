import { useContext, useEffect, useState } from "react";
import { Edit, Favorite, FavoriteBorder, Save } from "@mui/icons-material";
import {
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import useFavourite from "../../hooks/useFavourite";
import { AuthContext } from "../../context/AuthContext";
import useUpdate from "../../hooks/useUpdate";

const PokemonCard = ({
  isCreated,
  className,
  id,
  win,
  lose,
  name,
  weight,
  base_experience,
  height,
  abilities,
  img,
  onUpdatePokemon,
  onRemovePokemon,
  children,
}) => {
  const [favourite, setFavourite] = useState(false);
  const [editing, setEditing] = useState(false);
  const { toggleFavourite } = useFavourite();
  const { user } = useContext(AuthContext);
  const { updatePokemon, loading, error } = useUpdate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      weight,
      base_experience,
      height,
    },
  });

  useEffect(() => {
    if (user.favourites.includes(id)) {
      setFavourite(true);
    }
  }, [user, id]);

  const handleFavourite = () => {
    toggleFavourite(id);
    setFavourite((prev) => !prev);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async (data) => {
    await updatePokemon(id, data);
    onUpdatePokemon(id, updatePokemon);
    setEditing(false);
  };

  const handleRemoveClick = () => {
    onRemovePokemon(id);
  };

  const CapitalName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <Box
      className={`flex w-full max-w-72 m-3 p-2 justify-around flex-col transition-transform duration-300 transform ease-in-out hover:scale-105 border-2 rounded-md border-light-border dark:text-dark-primary dark:bg-dark-card dark:border-dark-border bg-light-card ${className}`}
      key={id}
    >
      {(win || lose) && (
        <Box className="absolute flex gap-2 top-0 right-0 p-1 border-b-2 border-l-2 rounded-bl-md rounded-tr-md bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border">
          <Typography className="text-light-primary dark:text-dark-primary">
            W: {win}
          </Typography>
          <Typography className="text-light-primary dark:text-dark-primary">
            L: {lose}
          </Typography>
        </Box>
      )}
      <Box>
        <Box>
          {isCreated ? (
            editing ? (
              loading ? (
                <CircularProgress />
              ) : (
                <IconButton onClick={handleSubmit(handleSaveClick)}>
                  <Save />
                </IconButton>
              )
            ) : (
              <IconButton onClick={handleEditClick}>
                <Edit />
              </IconButton>
            )
          ) : (
            !onRemovePokemon && (
              <IconButton onClick={handleFavourite}>
                {favourite ? (
                  <Favorite sx={{ color: "#f87171" }} />
                ) : (
                  <FavoriteBorder sx={{ color: "#f87171" }} />
                )}
              </IconButton>
            )
          )}
          {onRemovePokemon && (
            <IconButton onClick={handleRemoveClick}>
              <RemoveCircleOutlineIcon color="error" />
            </IconButton>
          )}
        </Box>

        <CardMedia
          component="img"
          alt={name}
          className="h-52"
          image={img}
          sx={{ height: 200, objectFit: "contain" }}
        />
        <CardContent>
          {editing ? (
            <Box
              className="flex flex-col gap-4"
              component="form"
              onSubmit={handleSubmit(handleSaveClick)}
            >
              <Typography
                className="text-light-primary dark:text-dark-primary"
                textAlign="center"
                primaryWeight="700"
                variant="h5"
                component="div"
                gutterBottom
              >
                {CapitalName(name)}
              </Typography>
              <TextField
                label="Weight"
                {...register("weight", { valueAsNumber: true })}
                variant="outlined"
                fullWidth
                type="number"
              />
              <TextField
                label="Base Experience"
                {...register("base_experience", { valueAsNumber: true })}
                variant="outlined"
                fullWidth
                type="number"
              />
              <TextField
                label="Height"
                {...register("height", { valueAsNumber: true })}
                variant="outlined"
                fullWidth
                type="number"
              />
              <Button type="submit">Save</Button>
              {error && <Typography color="error">{error}</Typography>}
            </Box>
          ) : (
            <>
              <Typography
                className="text-center text-light-primary dark:text-dark-primary "
                component="div"
                variant="h5"
                gutterBottom
              >
                {CapitalName(name)}
              </Typography>
              <Typography
                variant="body2"
                className="dark:text-dark-primary text-light-primary"
              >
                Weight: {weight} kg
              </Typography>
              <Typography
                variant="body2"
                className="dark:text-dark-primary text-light-primary"
              >
                Base Experience: {base_experience}
              </Typography>
              <Typography
                variant="body2"
                className="dark:text-dark-primary text-light-primary"
              >
                Height: {height} m
              </Typography>
              {abilities && (
                <Typography
                  variant="body2"
                  className="dark:text-dark-primary text-light-primary"
                >
                  Abilities:{" "}
                  {abilities.map((ability) => ability.ability.name).join(", ")}
                </Typography>
              )}
            </>
          )}
          {children}
        </CardContent>
      </Box>
      {!isCreated && (
        <NavLink
          className="flex items-center justify-center"
          to={`/pokemon/${id}`}
        >
          <Button>Show more</Button>
        </NavLink>
      )}
    </Box>
  );
};

export default PokemonCard;
