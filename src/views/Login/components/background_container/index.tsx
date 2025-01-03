import { Box } from "@mui/material";


export default function BackgroundContainer() {
  return (
    <Box sx={{
      position: "absolute",
      top: 0,
      right: 0,
      height: "100%",
      width: "65%",
      backgroundColor: `#325677`,
      border: `3px solid #eab552`,
      borderTopLeftRadius: "30px", 
      borderBottomLeftRadius: "30px",
      boxSizing: "border-box",
      // boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
    }}/>

  );
}
