import {
  Avatar,
  Box,
  Tooltip,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

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

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const routes = [
    { name: "Ranking", id: 1, path: "ranking" },
    { name: "Favourites", id: 2, path: "favourites" },
    { name: "Arena", id: 3, path: "arena" },
    { name: "Edit", id: 4, path: "edit" },
  ];

  const drawerList = (
    <Box
      className="w-40 h-full bg-dark-background text-dark-primary"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className="w-40 h-full bg-dark-background text-dark-primary">
        {isLoggedIn ? (
          routes.map(({ name, id, path }) => (
            <ListItem key={id} component={NavLink} to={`/${path}`}>
              <ListItemText primary={name} />
            </ListItem>
          ))
        ) : (
          <>
            <ListItem className="" component={NavLink} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem component={NavLink} to="/register">
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box className="dark:bg-dark-nav sticky w-full flex h-24 mb-8 p-4 shadow-md bg-light-nav">
      <NavLink className="flex" to={"/"}>
        <Logo />
      </NavLink>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
      <Box className="flex w-full justify-end items-center gap-8">
        {isLoggedIn && (
          <>
            <Box className="flex gap-6 justify-center items-center">
              <Box className="flex flex-col items-center gap-2">
                <Avatar
                  sx={{ bgcolor: "transparent" }}
                  className="text-light-primary dark:text-dark-primary border-2"
                >
                  {user.username.slice(0, 1)}
                </Avatar>
                <Typography className="dark:text-dark-primary text-light-primary">
                  {user.username}
                </Typography>
              </Box>
              <Tooltip
                sx={{ fontSize: "1.8rem", alignItems: "center" }}
                className="flex flex-col gap-2 hover:cursor-pointer "
                onClick={handleLogOut}
                title="Log out"
              >
                <LogoutIcon className="dark:text-dark-primary" />
              </Tooltip>
            </Box>
          </>
        )}
        <MaterialUISwitch checked={isDarkMode} onChange={handleToggle} />
        <IconButton
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon className="dark:text-dark-primary text-light-primary" />
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawerList}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navigation;
