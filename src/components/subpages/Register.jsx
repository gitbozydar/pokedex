import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  TextField,
  Box,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { BASE_URL } from "../shared/apiConfig";
import useRegister from "../hooks/useRegister";

const schema = z
  .object({
    username: z.string().min(3, { message: "Too short" }),
    email: z
      .string()
      .min(1, { message: "Required" })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(8, { message: "Too short" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/,
        {
          message:
            "Should start with capital letter, end with special character",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isLoading, error, fetchUser } = useRegister(`${BASE_URL}/users`);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    fetchUser(
      data,
      () => {
        enqueueSnackbar("Registration successful!", {
          variant: "success",
        });
      },
      () => {
        enqueueSnackbar("User already exist, try to log in...", {
          variant: "error",
        });
      }
    );
    reset();
  };

  const ShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const ShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <form
      className="flex w-full items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box className="flex bg-light-card border-light-border  flex-col gap-8 w-full max-w-md rounded-xl border p-8 dark:border-dark-border dark:bg-dark-card">
        <h2 className="dark:text-dark-primary text-light-primary text-2xl ml-1">
          Register:
        </h2>

        <TextField
          {...register("username")}
          autoComplete="username"
          error={errors.username && true}
          variant="outlined"
          label="Username"
          helperText={errors.username?.message && errors.username?.message}
        />
        <TextField
          {...register("email")}
          error={errors.email && true}
          autoComplete="email"
          variant="outlined"
          label="E-mail"
          helperText={errors.email?.message && errors.email?.message}
        />
        <TextField
          {...register("password")}
          variant="outlined"
          error={errors.password && true}
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          helperText={errors.password?.message && errors.password?.message}
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
        <TextField
          {...register("confirmPassword")}
          variant="outlined"
          error={errors.confirmPassword && true}
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          autoComplete="new-password"
          helperText={
            errors.confirmPassword?.message && errors.confirmPassword?.message
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={ShowConfirmPassword}>
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          className="dark:bg-dark-button"
          type="submit"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </Box>
    </form>
  );
};

export default Register;
