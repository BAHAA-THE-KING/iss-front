import { ExitToApp } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router";

import Logo from "src/assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("clientPrivateKey");
    Cookies.remove("sessionKey");
    Cookies.remove("serverPublicKey");
    navigate("/login", { replace: true });
  };

  const role = Cookies.get("role");

  return (
    <Box
      style={{
        height: "75px",
        backgroundColor: "#FEFEFE",
        padding: "0 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo and Links */}
      <Box style={{ height: "100%", display: "flex", alignItems: "center" }}>
        <img
          src={Logo}
          alt="Logo"
          style={{
            height: "100%",
            transition: "transform 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <Box
          style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
        >
          <Link
            to="/show-parks"
            style={{
              textDecoration: "none",
              color: "#333",
              margin: "0 15px",
              fontSize: "16px",
              fontWeight: 500,
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1976d2")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
          >
            <Typography>Parks</Typography>
          </Link>
          <Link
            to="/account"
            style={{
              textDecoration: "none",
              color: "#333",
              margin: "0 15px",
              fontSize: "16px",
              fontWeight: 500,
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1976d2")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
          >
            <Typography>My Accounts</Typography>
          </Link>
          {role === "employee" && (
            <Link
              to="/admin-parks"
              style={{
                textDecoration: "none",
                color: "#333",
                margin: "0 15px",
                fontSize: "16px",
                fontWeight: 500,
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1976d2")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
            >
              <Typography>Admin Panel</Typography>
            </Link>
          )}
        </Box>
      </Box>

      {/* Logout Button */}
      <Button
        startIcon={<ExitToApp />}
        onClick={handleLogout}
        style={{
          color: "#333",
          fontWeight: 600,
          padding: "8px 16px",
          borderRadius: "8px",
          transition: "background-color 0.3s ease, transform 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f0f0f0";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Logout
      </Button>
    </Box>
  );
}
