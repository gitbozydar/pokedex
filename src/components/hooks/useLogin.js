import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../shared/apiConfig";

const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(AuthContext);

  const handleLogIn = async (onSuccess, onFailure, onLogOut) => {
    if (!isLoggedIn) {
      if (!username || !password) {
        onFailure && onFailure();
        return;
      }
      try {
        const url = `${BASE_URL}/users?username=${username}&password=${password}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
          setIsLoggedIn(true);
          setUser(data[0]);
          onSuccess && onSuccess();
        } else {
          setIsLoggedIn(false);
          onFailure && onFailure();
        }
      } catch (err) {
        console.error(err);
        onFailure && onFailure();
      }
    } else {
      setIsLoggedIn(false);
      setUsername("");
      setPassword("");
      onLogOut && onLogOudt();
    }
  };

  return {
    handleLogIn,
    setUsername,
    setPassword,
    username,
    password,
    isLoggedIn,
  };
};

export default useLogin;
