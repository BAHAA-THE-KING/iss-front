import { Account } from "./components";
import { Route } from "./types/Route";

import { ShowParks, Login, AdminParks } from "./views";

export default [
  {
    name: "login",
    path: "/login",
    element: <Login />,
  },
  {
    name: "show-parks",
    path: "/show-parks",
    element: <ShowParks />,
  },
  {
    name: "Parks",
    path: "/admin-parks",
    element: <AdminParks />,
  },
  {
    name: "Accounts",
    path: "/account",
    element: <Account />,
  },
] as Route[];
