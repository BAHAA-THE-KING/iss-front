import { Box } from "@mui/material";
import backgroundImage from "src/assets/background.png";


export default function BackgroundContainer() {
  return (
    <Box sx={{
      position: "absolute",
      top: 0,
      right: 0,
      height: "100%",
      width: "65%",
      backgroundColor: `#ececec`,
      borderTopLeftRadius: "30px", 
      borderBottomLeftRadius: "30px",
      boxSizing: "border-box",
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
    }}>
      <img
    src={backgroundImage}
    style={{
      height: "100%",
      objectFit:"cover",
      borderTopLeftRadius: "30px", 
      borderBottomLeftRadius: "30px",
      opacity: "0.5",
    }}
  />
      </Box>

  );
}
