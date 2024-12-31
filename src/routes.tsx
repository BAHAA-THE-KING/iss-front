import { Route } from "./types/Route";

import { Home, Login } from "./views";

export default [
  {
    name: "homepage",
    path: "/",
    element: <Home />,
  },
  {
    name: "login",
    path: "/login",
    element: <Login />,
  },
] as Route[];
