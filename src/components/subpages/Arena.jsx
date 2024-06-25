import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone";

import Placeholder from "../shared/Placeholder/Placeholder";
import PokemonCard from "../shared/PokemonCard/PokemonCard";
import PokemonList from "../shared/PokemonList/PokemonList";
import useFetch from "../hooks/useFetch";
import { POKE_URL } from "../shared/apiConfig";
import useCreated from "../hooks/useCreated";
import CustomPagination from "../shared/CustomPagination/CustomPagination";
import useStats from "../hooks/useStats";

const Arena = () => {
  const [firstPokemon, setFirstPokemon] = useState(null);
  const [secondPokemon, setSecondPokemon] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [url, setUrl] = useState(`${POKE_URL}/pokemon?limit=20`);
  const [showCreated, setShowCreated] = useState(false);
  const { updateStats } = useStats();
  const [firstPokemonBW, setFirstPokemonBW] = useState(false);
  const [secondPokemonBW, setSecondPokemonBW] = useState(false);

  const { data, isLoading, error, pageInfo } = useFetch(url);

  const { enqueueSnackbar } = useSnackbar();

  const {
    fetchCreated,
    createdPokemons,
    error: createdError,
    loading: createdLoading,
  } = useCreated();

  useEffect(() => {
    fetchCreated();
  }, []);

  const handlePageChange = (newUrl) => {
    setUrl(newUrl);
  };

  const handleOpenDialog = (slot) => {
    setSelectedSlot(slot);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const startFight = async () => {
    const firstStats = firstPokemon.weight * firstPokemon.base_experience;
    const secondStats = secondPokemon.weight * secondPokemon.base_experience;

    const firstWin = firstStats > secondStats;
    const secondWin = secondStats > firstStats;
    const draw = firstStats === secondStats;

    try {
      if (!draw) {
        await updateStats(firstPokemon, firstWin);
        await updateStats(secondPokemon, secondWin);

        if (firstWin) {
          setSecondPokemonBW(true);
        } else if (secondWin) {
          setFirstPokemonBW(true);
        }

        setTimeout(() => {
          setSecondPokemon(null);
          setFirstPokemon(null);
          setFirstPokemonBW(false);
          setSecondPokemonBW(false);
          enqueueSnackbar("Battle is over", {
            variant: "warning",
          });
        }, 2000);
      } else {
        setTimeout(() => {
          setSecondPokemon(null);
          setFirstPokemon(null);
          enqueueSnackbar("It's a draw!", {
            variant: "info",
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeList = () => {
    setShowCreated((prevShowCreated) => !prevShowCreated);
  };

  const handleSelectPokemon = (pokemon) => {
    if (selectedSlot === "first") {
      setFirstPokemon(pokemon);
    } else {
      setSecondPokemon(pokemon);
    }
    handleCloseDialog();
  };

  const handleRemovePokemon = (slot) => {
    if (slot === "first") {
      setFirstPokemon(null);
    } else {
      setSecondPokemon(null);
    }
  };

  return (
    <Box className="flex w-3/4 h-full justify-center items-center gap-12 p-10">
      {firstPokemon ? (
        <PokemonCard
          className={firstPokemonBW ? "bw" : ""}
          {...firstPokemon}
          img={
            firstPokemon.sprites
              ? firstPokemon.sprites.other.showdown.front_shiny
              : firstPokemon.img
          }
          onRemovePokemon={() => handleRemovePokemon("first")}
        />
      ) : (
        <Placeholder isActive={true} onClick={() => handleOpenDialog("first")}>
          Add <CatchingPokemonTwoToneIcon />
        </Placeholder>
      )}
      <Button
        onClick={startFight}
        size="large"
        variant="contained"
        color="error"
        disabled={!firstPokemon || !secondPokemon}
      >
        Fight!
      </Button>
      {secondPokemon ? (
        <>
          <PokemonCard
            className={secondPokemonBW ? "bw" : ""}
            {...secondPokemon}
            img={
              secondPokemon.sprites
                ? secondPokemon.sprites.other.showdown.front_shiny
                : secondPokemon.img
            }
            onRemovePokemon={() => handleRemovePokemon("second")}
          />
        </>
      ) : (
        <Placeholder isActive={true} onClick={() => handleOpenDialog("second")}>
          Add <CatchingPokemonTwoToneIcon />
        </Placeholder>
      )}

      <Dialog open={open} maxWidth="md" onClose={handleCloseDialog}>
        <DialogTitle>
          <CustomPagination {...pageInfo} onPageChange={handlePageChange}>
            Select a Pokémon
          </CustomPagination>
          <Box className="flex items-center">
            <Checkbox onChange={handleChangeList} checked={showCreated} />
            <Typography>Show created pokemons</Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          <PokemonList
            firstPokemon={firstPokemon}
            secondPokemon={secondPokemon}
            data={showCreated ? createdPokemons : data}
            isLoading={isLoading || createdLoading}
            error={error || createdError}
            onSelectPokemon={handleSelectPokemon}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Arena;
