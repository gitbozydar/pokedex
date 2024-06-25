import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useRegister = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async (newUser, onSuccess, onFailure) => {
    setIsLoading(true);

    const fullUser = {
      ...newUser,
      id: uuidv4(),
      favourites: [],
      created: [],
      stats: [],
    };

    try {
      const check = await fetch(url);
      const checkResponse = await check.json();
      const userExist = checkResponse.some(
        ({ email, username }) =>
          email === fullUser.email || username === fullUser.username
      );

      if (userExist) {
        setError("User already exist");
        onFailure && onFailure();
        return;
      }

      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullUser),
      });
      await data.json();
      onSuccess && onSuccess();
    } catch (err) {
      setError(err);
      onFailure && onFailure();
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchUser, isLoading, error };
};
export default useRegister;
