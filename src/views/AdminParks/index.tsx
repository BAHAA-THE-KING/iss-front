import { Box  } from "@mui/material";
import { AnimatedNavBar , ParksGird } from "./components";
import { useRequiredAuth } from "src/hooks";

export function AdminParks() {
  useRequiredAuth();
  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <AnimatedNavBar />
   
      <ParksGird
      />
    </Box>
  );
}
