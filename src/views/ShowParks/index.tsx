import { Box } from "@mui/material";

import { Navbar, Parks } from "./components";

export function ShowParks() {
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
