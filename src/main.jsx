import React from "react";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import Register from "./components/subpages/Register.jsx";
import Login from "./components/subpages/Login.jsx";
import Edit from "./components/subpages/Edit.jsx";
import Ranking from "./components/subpages/Ranking.jsx";
import Arena from "./components/subpages/Arena.jsx";
import Favourites from "./components/subpages/Favourites.jsx";
import ThemeProvider from "./components/context/ThemeContext.jsx";
import AuthProvider from "./components/context/AuthContext.jsx";
import Home from "./components/subpages/Home.jsx";
import PrivateRoute from "./components/shared/PrivateRoute.jsx";
import PublicRoute from "./components/shared/PublicRoute.jsx";
import Pokemon from "./components/subpages/Pokemon.jsx";

import "./components/styles/global.css";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <PublicRoute element={<Register />} />,
        path: "/register",
      },
      {
        element: <PublicRoute element={<Login />} />,
        path: "/login",
      },
      {
        element: <PrivateRoute element={<Edit />} />,
        path: "/edit",
      },
      {
        element: <PrivateRoute element={<Ranking />} />,
        path: "/ranking",
      },
      {
        element: <PrivateRoute element={<Arena />} />,
        path: "/arena",
      },
      {
        element: <PrivateRoute element={<Favourites />} />,
        path: "/favourites",
      },
      {
        element: <PrivateRoute element={<Pokemon />} />,
        path: "/pokemon/:id",
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
