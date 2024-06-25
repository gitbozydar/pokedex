import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, CardMedia, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useImage from "../../hooks/useImage";
import ImagePagination from "../CustomPagination/ImagePagination";
import useCreated from "../../hooks/useCreated";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  weight: z.number({ message: "Numbers only" }).positive(),
  height: z
    .number({ message: "Numbers only" })
    .positive()
    .min(1, { message: " Required" }),
  base_experience: z
    .number({ message: "Numbers only" })
    .positive()
    .min(1, { message: "Required" }),
});

const PokemonForm = () => {
  const { data, id, setId } = useImage(151);

  const { createPokemon, loading, error } = useCreated();

  const handlePrevious = () => {
    setId((prev) => Math.max(151, prev - 1));
  };

  const handleNext = () => {
    setId((prev) => prev + 1);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData) => {
    await createPokemon({ ...formData, img: data });
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="flex flex-col w-full max-w-md p-8 border rounded-2xl gap-4 border-light-border dark:border-dark-border">
          <Box className="flex gap-4">
            <TextField
              {...register("name")}
              label="Name"
              fullWidth
              variant="filled"
              error={errors.name && true}
              helperText={errors.name?.message && errors.name?.message}
            />
          </Box>
          <Box className="flex gap-4">
            <TextField
              {...register("weight", { valueAsNumber: true })}
              label="Weight"
              variant="filled"
              placeholder="kg"
              error={errors.weight && true}
              helperText={errors.weight?.message && errors.weight?.message}
            />
            <TextField
              {...register("height", { valueAsNumber: true })}
              label="Height"
              variant="filled"
              placeholder="cm"
              error={errors.height && true}
              helperText={errors.height?.message && errors.height?.message}
            />
            <TextField
              {...register("base_experience", { valueAsNumber: true })}
              label="Exp"
              variant="filled"
              error={errors.base_experience && true}
              helperText={
                errors.base_experience?.message &&
                errors.base_experience?.message
              }
            />
          </Box>
          <Box className="flex justify-between">
            <ImagePagination
              onPrevious={handlePrevious}
              onNext={handleNext}
              previous={id > 151}
              next={id < 10000}
            >
              <CardMedia
                component="img"
                className="w-52 h-52 object-contain"
                image={data}
                {...register("img")}
              />
            </ImagePagination>
          </Box>
          <Button
            className="dark:bg-dark-button"
            variant="contained"
            type="submit"
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </Box>
      </form>
    </>
  );
};
export default PokemonForm;
