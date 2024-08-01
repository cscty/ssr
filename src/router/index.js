import Home from "../pages/Home";
import Login from "../pages/Login";
import Son from "../pages/Son";
import NotFound from "../pages/NotFound";
import withClient from "../components/withClient";
const routes = [
  {
    path: "/",
    Component: withClient(Home),
  },
  {
    path: "/login",
    Component: withClient(Login),
    children: [
      {
        path: "son",
        Component: withClient(Son),
      },
    ],
  },
  {
    path: "*",
    Component: withClient(NotFound),
  },
];
export { routes };
