import { routes } from "../router";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
let router = createBrowserRouter(routes);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
