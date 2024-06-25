import { Outlet } from "react-router-dom";

import Layout from "./components/shared/Layout/Layout";

import "./components/styles/App.css";

const App = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default App;
