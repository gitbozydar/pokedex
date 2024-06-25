import { Box } from "@mui/material";

import Navigation from "../Navigation/Navigation";

const Layout = ({ children }) => {
  return (
    <Box className="flex flex-col items-center h-full dark:bg-dark-background bg-light-background">
      <Navigation />
      {children}
    </Box>
  );
};

export default Layout;
