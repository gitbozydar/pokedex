import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../shared/apiConfig";

const useStats = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateStats = async ({ id, base_experience }, winner, onSuccess) => {
    try {
      setIsLoading(true);

      const responseUser = await fetch(`${BASE_URL}/users/${user.id}`);
      const latestUser = await responseUser.json();

      const existingPokemonIndex = latestUser.stats?.findIndex(
        (stat) => stat.id === id
      );

      let updatedStats;
      if (existingPokemonIndex !== -1) {
        updatedStats = latestUser.stats.map((stat) =>
          stat.id === id
            ? {
                ...stat,
                base_experience: stat.base_experience + (winner ? 10 : 0),
                win: winner ? stat.win + 1 : stat.win,
                lose: winner ? stat.lose : stat.lose + 1,
              }
            : stat
        );
      } else {
        updatedStats = [
          ...latestUser.stats,
          {
            id,
            base_experience: base_experience + 10,
            win: winner ? 1 : 0,
            lose: winner ? 0 : 1,
          },
        ];
      }

      const response = await fetch(`${BASE_URL}/users/${latestUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...latestUser,
          stats: updatedStats,
        }),
      });

      const updatedUser = await response.json();
      onSuccess && onSuccess();
      setUser(updatedUser);
    } catch (err) {
      setError(err);
      console.error("Error updating stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateStats, isLoading, error };
};

export default useStats;
