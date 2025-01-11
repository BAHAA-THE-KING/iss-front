import { Box } from "@mui/material";

import { Navbar, Parks } from "./components";

import { useParks } from "./data";

export function ShowParks() {
  const { parks } = useParks();
  return (
    <Box
      width={"100%"}
      minHeight={"100vh"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Navbar />
      <Parks parks={parks} />
    </Box>
  );
}
