import { useContext, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  TableSortLabel,
  Button,
  Box,
} from "@mui/material";

import useFetch from "../hooks/useFetch";
import { POKE_URL, BASE_URL } from "../shared/apiConfig";
import CustomPagination from "../shared/CustomPagination/CustomPagination";
import { AuthContext } from "../context/AuthContext";

const Ranking = () => {
  const [url, setUrl] = useState(`${POKE_URL}/pokemon?limit=100`);
  const { user } = useContext(AuthContext);

  const { data, isLoading, pageInfo } = useFetch(
    url,
    `${BASE_URL}/users/${user.id}`
  );

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handlePageChange = (newUrl) => {
    setUrl(newUrl);
  };

  const calculateWinRatio = (wins, loses) => {
    const winRatio = loses === 0 ? wins : (wins / loses).toFixed(2);
    return winRatio;
  };

  const sortedData = data
    ? [...data].sort((a, b) => {
        if (orderBy === "name") {
          return order === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else {
          return order === "asc"
            ? a[orderBy] - b[orderBy]
            : b[orderBy] - a[orderBy];
        }
      })
    : [];

  return (
    <Box className="max-w-4xl mx-auto my-8 p-4 bg-light-card dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg shadow-md overflow-auto">
      <Box className="flex justify-between items-center mb-4">
        <Button
          className="w-full dark:bg-dark-button "
          variant="contained"
          onClick={() => setOrderBy("")}
        >
          Clear Filters
        </Button>
        <CustomPagination {...pageInfo} onPageChange={handlePageChange} />
      </Box>
      {isLoading ? (
        <Box className="flex justify-center items-center h-64">
          <CircularProgress />
        </Box>
      ) : (
        <Table className="w-full border-collapse">
          <TableHead>
            <TableRow className="uppercase text-sm leading-normal text-light-secondary">
              {["name", "weight", "height", "base_experience", "win/lose"].map(
                (header) => (
                  <TableCell
                    sx={{ borderColor: "var(--tw-border-light-border)" }}
                    key={header}
                    className="py-3 px-6 text-left border-b border-light-border dark:border-dark-border"
                  >
                    <TableSortLabel
                      className=" dark:text-dark-primary"
                      active={orderBy === header}
                      direction={orderBy === header ? order : "asc"}
                      onClick={() => handleRequestSort(header)}
                    >
                      {header.replace(/_/g, " ")}
                    </TableSortLabel>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody className="text-light-secondary dark:text-dark-primary text-sm font-light">
            {sortedData.map(
              ({
                id,
                name,
                weight,
                height,
                base_experience,
                sprites,
                win,
                lose,
              }) => (
                <TableRow
                  key={id}
                  sx={{ borderColor: "var(--tw-border-light-border)" }}
                  className="border-b dark:border-dark-border hover:bg-light-link  dark:hover:bg-dark-link"
                >
                  <TableCell
                    sx={{ borderColor: "var(--tw-border-light-border)" }}
                    className="py-3 px-6 border-r border-x dark:text-dark-primary dark:border-dark-border"
                  >
                    <Box className="flex items-center">
                      <img
                        className="w-10 h-10 mr-2"
                        src={sprites.other.home.front_shiny}
                        alt={`${name} sprite`}
                      />
                      <span className="font-medium text-light-primary dark:text-dark-primary">
                        {name}
                      </span>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ borderColor: "var(--tw-border-light-border)" }}
                    className="py-3 px-6 border-r dark:text-dark-primary  dark:border-dark-border"
                  >
                    {weight}
                  </TableCell>
                  <TableCell
                    sx={{ borderColor: "var(--tw-border-light-border)" }}
                    className="py-3 px-6 border-r dark:text-dark-primary  dark:border-dark-border"
                  >
                    {height}
                  </TableCell>
                  <TableCell
                    sx={{ borderColor: "var(--tw-border-light-border)" }}
                    className="py-3 px-6 border-r dark:text-dark-primary  dark:border-dark-border"
                  >
                    {base_experience}
                  </TableCell>
                  <TableCell
                    sx={{ borderColor: "var(--tw-border-light-border)" }}
                    className="py-3 px-6 border-r dark:text-dark-primary  dark:border-dark-border"
                  >
                    {calculateWinRatio(win, lose)}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default Ranking;
