import { AppBar, Box, Button } from "@mui/material";
import Logo from "../icons/Logo";
import { Link, Outlet } from "react-router-dom";

const Navigation = ({ pages }) => {
  return (
    <>
      <AppBar position="sticky" sx={{ px: "1rem", flexDirection: "row" }}>
        <Link to={"/home"}>
          <Logo />
        </Link>
        <Box display="flex">
          {pages.map((page) => (
            <Link key={page} to={`/${page}`}>
              <Button sx={{ color: "white", height: "100%" }} variant="text">
                {page}
              </Button>
            </Link>
          ))}
        </Box>
      </AppBar>
      <Outlet />
    </>
  );
};
export default Navigation;
