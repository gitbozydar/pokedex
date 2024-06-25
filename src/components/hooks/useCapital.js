import { useMemo } from "react";

const useCapitalName = (name) => {
  const capitalName = useMemo(() => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }, [name]);

  return capitalName;
};

export default useCapitalName;
