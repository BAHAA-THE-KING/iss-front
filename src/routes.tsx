import { Route } from "./types/Route";

import { ShowParks, Login } from "./views";

export default [
  {
    name: "show-parks",
    path: "/show-parks",
    element: <ShowParks />,
  },
  {
    name: "login",
    path: "/login",
    element: <Login />,
  },
] as Route[];
