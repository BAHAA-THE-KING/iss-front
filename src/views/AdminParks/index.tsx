import { Box , Typography } from "@mui/material";
import { AnimatedNavBar } from "./components";

export function AdminParks() {
  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <AnimatedNavBar />
      <Typography variant="h6" textAlign="left" mt={1} sx={{ paddingTop: "70px", maxHeight:'64px', height:'20.vh'}}>
        Scroll to see the Navbar in action!
      </Typography>
    </Box>
  );
}
