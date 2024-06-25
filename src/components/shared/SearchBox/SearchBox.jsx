import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <Box className="flex items-center border rounded-full p-2 border-light-border dark:border-dark-border">
      <InputBase
        onChange={handleChange}
        className="flex-grow dark:text-dark-font ml-2"
        placeholder="Search your Pokemon"
      />
      <IconButton className="dark:text-dark-border">
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBox;
