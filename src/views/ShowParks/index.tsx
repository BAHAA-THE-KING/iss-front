import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { Navbar, Parks } from "./components";

import { Park } from "src/types/Park";

import fakeData from "src/fakeData";

export function ShowParks() {
  const [parks, setParks] = useState<Park[]>(fakeData.parks);
  useEffect(() => {
    // TODO: get data
  }, []);
  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"}>
      <Navbar />
      <Parks parks={parks} />
    </Box>
  );
}
