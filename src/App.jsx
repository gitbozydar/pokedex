import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Ranking from "./components/subpages/Ranking";
import Home from "./components/subpages/Home";
import Arena from "./components/subpages/Arena";
import Login from "./components/subpages/Login";
import Register from "./components/subpages/Register";
import Favourites from "./components/subpages/Favourites";
import Edit from "./components/subpages/Edit";
import Navigation from "./components/Navigation/Navigation";

import "./App.css";

const App = () => {
  const pages = ["ranking", "favourites", "arena", "edit"];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigation pages={pages} />,
      children: [
        { path: "/home", element: <Home /> },
        { path: "/arena", element: <Arena /> },
        { path: "/login", element: <Login /> },
        { path: "/ranking", element: <Ranking /> },
        { path: "/register", element: <Register /> },
        { path: "/edit", element: <Edit /> },
        { path: "/favourites", element: <Favourites /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
