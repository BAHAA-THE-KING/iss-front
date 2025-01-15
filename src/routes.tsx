import { Route } from "./types/Route";

import { ShowParks, Login ,AdminParks} from "./views";

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
  {
    name: "Parks",
    path: "/admin-parks",
    element: <AdminParks />,
  },
] as Route[];
