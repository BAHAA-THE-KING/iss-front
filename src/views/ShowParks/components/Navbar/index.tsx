import { ExitToApp } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

import Logo from "src/assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("clientPrivateKey");
    Cookies.remove("sessionKey");
    Cookies.remove("sessionKey");
    navigate("/login", { replace: true });
  };
  return (
    <Box
      height={"75px"}
      bgcolor={"#FEFEFE"}
      p={1}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <img
        src={Logo}
        style={{
          height: "100%",
        }}
      />
      <Button startIcon={<ExitToApp />} color="inherit" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}
