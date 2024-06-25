import { useContext, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import { POKE_URL } from "../shared/apiConfig";
import PokemonCard from "../shared/PokemonCard/PokemonCard";
import SearchBox from "../shared/SearchBox/SearchBox";
import CustomPagination from "../shared/CustomPagination/CustomPagination";
import { AuthContext } from "../context/AuthContext";
import WelcomeGif from "../icons/Gif";

const Home = () => {
  const [url, setUrl] = useState(`${POKE_URL}/pokemon/`);
  const [input, setInput] = useState("");

  const { isLoggedIn } = useContext(AuthContext);

  const { data, isLoading, pageInfo } = useFetch(url);

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

  return (
    <Box className="flex flex-col items-center justify-center">
      {!isLoggedIn ? (
        <Box className="flex flex-col gap-6">
          <h1 className="text-7xl dark:text-dark-primary text-light-primary">
            Welcome to Pokédex!
          </h1>
          <Box className="flex gap-36">
            <Box className="flex flex-col gap-1 dark:text-dark-secondary">
              <p className="text-3xl dark:text-dark-secondary text-light-primary">
                First time here?
              </p>
              <NavLink
                className=" flex font-semibold hover:text-light-hover text-light-link dark:text-dark-link hover:dark:text-dark-font_hover text-1xl  "
                to={"/register"}
              >
                Create an account
              </NavLink>
            </Box>
            <WelcomeGif />
          </Box>
          <p className="text-light-primary dark:text-dark-primary">
            If you already have an account,{" "}
            <NavLink
              className="font-semibold text-light-link hover:text-light-hover dark:text-dark-link hover:dark:text-dark-font_hover text-1xl"
              to={"/login"}
            >
              log in.
            </NavLink>{" "}
          </p>
        </Box>
      ) : (
        <Box className="flex flex-col content-center items-center gap-3 p-1 dark:bg-dark-background bg-light-background">
          <SearchBox onSearch={handleSearch} />
          <Box className="flex flex-wrap justify-center gap-8">
            {isLoading ? (
              <CircularProgress />
            ) : filteredData.length === 0 ? (
              <p>No Pokémon found.</p>
            ) : (
              filteredData.map(({ id, sprites, ...rest }) => (
                <PokemonCard
                  key={id}
                  img={sprites.other.dream_world.front_default}
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
      )}
    </Box>
  );
};

export default Home;
