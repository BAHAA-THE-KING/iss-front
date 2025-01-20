import { Box } from "@mui/material";
import  {Parks}  from "./components";
import {Navbar}  from "../ShowParks/components";
export function Reservations() {
    
  return (
    <Box
    width={"100%"}
    minHeight={"100vh"}
    display={"flex"}
    flexDirection={"column"}
    >
        <Navbar/>
        <Parks/>
    </Box>
  );
}
