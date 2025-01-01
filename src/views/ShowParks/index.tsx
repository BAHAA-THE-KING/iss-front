import { Box } from "@mui/material";
import { Navbar, Parks } from "./components";
import { useState } from "react";
import { Park } from "src/types/Park";
import fakeData from "src/fakeData";

export function ShowParks() {
  const [parks, setParks] = useState<Park[]>(fakeData.parks);
  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"}>
      <Navbar />
      <Parks parks={parks} />
    </Box>
  );
}
