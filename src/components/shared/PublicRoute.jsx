import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({ element }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Navigate to={"/"} /> : element;
};

export default PublicRoute;
