import { Box, Button } from "@mui/material";

const Placeholder = ({ onClick, children }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      className="w-72 flex justify-center items-center h-64 bg-white border border-gray-300 rounded-lg shadow-md"
    >
      <Box className="items-center justify-center">{children}</Box>
    </Button>
  );
};

export default Placeholder;
