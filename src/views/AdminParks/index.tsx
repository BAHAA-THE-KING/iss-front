import { Box  } from "@mui/material";
import { AnimatedNavBar , ParksGird } from "./components";

export function AdminParks() {
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
