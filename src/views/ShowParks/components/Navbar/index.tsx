import { Box } from "@mui/material";

import Logo from "src/assets/logo.png";

export default function Navbar() {
  return (
    <Box height={"75px"} bgcolor={"#FEFEFE"} p={1}>
      <img
        src={Logo}
        style={{
          height: "100%",
        }}
      />
    </Box>
  );
}
