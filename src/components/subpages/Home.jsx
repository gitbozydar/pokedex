import { useContext, useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

import useFetch from "../hooks/useFetch";
import { POKE_URL } from "../shared/apiConfig";
import PokemonCard from "../shared/PokemonCard/PokemonCard";
import SearchBox from "../shared/SearchBox/SearchBox";
import CustomPagination from "../shared/CustomPagination/CustomPagination";
import { AuthContext } from "../context/AuthContext";
import Welcome from "../shared/Welcome/Welcome";
import useCreated from "../hooks/useCreated";

const Home = () => {
  const [url, setUrl] = useState(`${POKE_URL}/pokemon/?offset=0&limit=20`);
  const [input, setInput] = useState("");

  const { isLoggedIn } = useContext(AuthContext);

  const { data, isLoading, pageInfo } = useFetch(url);

  const {
    fetchCreated,
    createdPokemons,
    loading: createdLoading,
  } = useCreated();

  useEffect(() => {
    fetchCreated();
  }, [isLoggedIn, fetchCreated, url]);

  const handlePageChange = (newUrl) => {
    setUrl(newUrl);
  };

  const handleSearch = (value) => {
    setInput(value);
    if (value.trim()) {
      setUrl(`${POKE_URL}/pokemon?limit=100000&offset=0`);
    } else {
      setUrl(`${POKE_URL}/pokemon/`);
    }
  };

  const filteredData = data
    ? data.filter(({ name }) =>
        name.toLowerCase().includes(input.toLowerCase())
      )
    : [];

  const displayData =
    isLoggedIn && url === `${POKE_URL}/pokemon/?offset=0&limit=20`
      ? [...createdPokemons, ...filteredData]
      : filteredData;

  return (
    <Box className="flex flex-col gap-8 items-center justify-center w-full">
      {!isLoggedIn && (
        <>
          <Welcome />
        </>
      )}
      <Box className="flex flex-col content-center items-center gap-3 p-1 dark:bg-dark-background bg-light-background">
        <SearchBox onSearch={handleSearch} />
        <Box className="flex flex-wrap justify-center gap-8">
          {isLoading ? (
            <CircularProgress />
          ) : displayData.length === 0 ? (
            <p>No Pokémon found.</p>
          ) : (
            displayData.map(({ id, sprites, ...rest }) => (
              <PokemonCard
                key={id}
                img={sprites && sprites.other.dream_world.front_default}
                {...rest}
                id={id}
              />
            ))
          )}
        </Box>
        {data && (
          <CustomPagination {...pageInfo} onPageChange={handlePageChange} />
        )}
      </Box>
    </Box>
  );
};

export default Home;
