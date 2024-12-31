import { Route } from "./types/Route";

import { Home } from "./views";

export default [
  {
    name: "homepage",
    path: "/",
    element: <Home />,
  },
] as Route[];
