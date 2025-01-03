import { Box } from "@mui/material";

import loginImage from "src/assets/login.png";

export default function BackgroundImage() {
  return (
    <Box height={"100%"}  sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "auto",
      height: "100%",
      objectFit: "cover",
    }}>
  <img
    src={loginImage}
    style={{
      height: "100%",
      objectFit:"cover",

    }}
  />
</Box>
  );
}
