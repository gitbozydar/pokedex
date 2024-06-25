import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Box,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import useLogin from "../hooks/useLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogIn, setUsername, setPassword, username, password } =
    useLogin();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleLogIn(
      () => {
        enqueueSnackbar("You succsessfully logged in", { variant: "success" });
        navigate("/");
      },
      () => {
        enqueueSnackbar("User not found", { variant: "error" });
      }
    );
  };

  const ShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full items-center justify-center"
    >
      <Box className="flex flex-col gap-8 w-full max-w-md rounded-xl border p-8 border-light-border bg-light-card dark:border-dark-border dark:bg-dark-card">
        <h2 className="text-light-primary dark:text-dark-primary text-2xl ml-1">
          Log In:
        </h2>
        <TextField
          className="border dark:border-dark-border"
          autoComplete="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={ShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          className="dark:bg-dark-button"
          type="submit"
          variant="contained"
        >
          Log In
        </Button>
      </Box>
    </form>
  );
};

export default Login;
