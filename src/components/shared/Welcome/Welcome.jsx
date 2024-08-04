import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";

import WelcomeGif from "../../icons/Gif";

const Welcome = () => {
  return (
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
  );
};

export default Welcome;
