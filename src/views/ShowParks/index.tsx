import { Box } from "@mui/material";

import { Navbar, Parks } from "./components";
import { useRequiredAuth } from "src/hooks";

export function ShowParks() {
  useRequiredAuth(["visitor", "employee", "admin"]);
  return (
    <Box
      width={"100%"}
      minHeight={"100vh"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Navbar />
      <Parks />
    </Box>
  );
}
