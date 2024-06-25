import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ImagePagination = ({ children, next, previous, onPrevious, onNext }) => {
  return (
    <Box className="flex w-full items-center">
      <IconButton className="h-max" onClick={onPrevious} disabled={!previous}>
        <ArrowBackIcon className="dark:text-dark-pagination" />
      </IconButton>
      {children}
      <IconButton className="h-max" onClick={onNext} disabled={!next}>
        <ArrowForwardIcon className="dark:text-dark-pagination" />
      </IconButton>
    </Box>
  );
};

export default ImagePagination;
