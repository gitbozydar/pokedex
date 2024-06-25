import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CustomPagination = ({ children, next, previous, onPageChange }) => {
  return (
    <Box className="flex w-full justify-center items-center">
      <IconButton onClick={() => onPageChange(previous)} disabled={!previous}>
        <ArrowBackIcon className="dark:text-dark-pagination" />
      </IconButton>
      {children}
      <IconButton onClick={() => onPageChange(next)} disabled={!next}>
        <ArrowForwardIcon className="dark:text-dark-pagination" />
      </IconButton>
    </Box>
  );
};

export default CustomPagination;
