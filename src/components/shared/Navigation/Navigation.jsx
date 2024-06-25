import { Avatar, Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

import Logo from "../../icons/Logo";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import useLogin from "../../hooks/useLogin";
import { useSnackbar } from "notistack";
import MaterialUISwitch from "../Switch/Switch";

const Navigation = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { handleToggle, isDarkMode } = useContext(ThemeContext);

  const { handleLogIn } = useLogin();

  const { enqueueSnackbar } = useSnackbar();

  const handleLogOut = () => {
    handleLogIn(
      () => {},
      () => {},
      () => {
        enqueueSnackbar("You logged out", { variant: "info" });
      }
    );
  };

  const routes = [
    { name: "Ranking", id: 1, path: "ranking" },
    { name: "Favourites", id: 2, path: "favourites" },
    { name: "Arena", id: 3, path: "arena" },
    { name: "Edit", id: 4, path: "edit" },
  ];

  return (
    <Box className="dark:bg-dark-nav sticky w-full flex h-24 mb-8 p-4 shadow-md bg-light-nav">
      <NavLink className="flex" to={"/"}>
        <Logo />
      </NavLink>
      <Box display="flex">
        {isLoggedIn ? (
          <>
            {routes.map(({ name, id, path }) => (
              <NavLink key={id} to={`/${path}`}>
                <button
                  className="text-light-primary h-full dark:text-dark-primary px-4"
                  variant="text"
                >
                  {name}
                </button>
              </NavLink>
            ))}
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <button className="dark:text-dark-primary text-light-primary h-full px-4">
                Login
              </button>
            </NavLink>
            <NavLink to={"/register"}>
              <button className="dark:text-dark-primary text-light-primary h-full px-4">
                Register
              </button>
            </NavLink>
          </>
        )}
      </Box>
      <Box className="flex w-full justify-end items-center gap-4">
        {isLoggedIn && (
          <>
            <Box className="flex gap-4">
              <Box className="flex flex-col items-center gap-2">
                <Avatar>{user.username.slice(0, 1)}</Avatar>
                <Typography className="dark:text-dark-primary text-light-primary">
                  {user.username}
                </Typography>
              </Box>
              <Button onClick={handleLogOut}>
                <LogoutIcon className="dark:text-dark-primary" />
              </Button>
            </Box>
          </>
        )}
        <MaterialUISwitch checked={isDarkMode} onChange={handleToggle} />
      </Box>
    </Box>
  );
};
export default Navigation;
