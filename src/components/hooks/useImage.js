import { useEffect, useState } from "react";

import { POKE_URL } from "../shared/apiConfig";

const useImage = (pokeId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(pokeId);
  useEffect(() => {
    const fetchImg = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${POKE_URL}/pokemon/${id}`);
        const data = await response.json();
        const img = data.sprites.other.home.front_default;
        setData(img);
      } catch (err) {
        console.error(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchImg();
  }, [id]);
  return { data, setId, id, loading };
};

export default useImage;
