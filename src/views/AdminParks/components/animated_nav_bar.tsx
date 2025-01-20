import { AppBar, Toolbar, Typography, Button , Box } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useScrollVisibility } from "src/hooks";

import { Link, useNavigate } from "react-router";
import Cookies from "js-cookie";

const AnimatedNavBar = () => {
  const isVisible = useScrollVisibility();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("clientPrivateKey");
    Cookies.remove("sessionKey");
    Cookies.remove("serverPublicKey");
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };
  const role = Cookies.get("role");

  const getLinkStyle = (path: string) => ({
    textDecoration: "none",
    color: location.pathname === path ? "wheat" : "white",
    margin: "0 15px",
    fontSize: "16px",
    fontWeight: 500,
    transition: "color  ease",
  });
  return (
    <motion.div
      style={{ position: "fixed", width: "100%", zIndex: 10 }}
      animate={{
        y: isVisible ? 0 : -300,
      }}
      initial={{ y: 0 }}
      transition={{
        type: "tween",
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#325677" }}>
        
        <Toolbar>
        
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cars Parking Dashboard
          </Typography>
          <Box
          style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
        >
          <Link
            to="/show-parks"
            style={getLinkStyle("/show-parks")}

            onMouseEnter={(e) => (e.currentTarget.style.color = "#1976d2")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
          >
            <Typography sx={ getLinkStyle("/show-parks")}>Parks</Typography>
          </Link>
          <Link
            to="/account"
            style={getLinkStyle("/account")}

            onMouseEnter={(e) => (e.currentTarget.style.color = "#1976d2")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
          >
            <Typography sx={ getLinkStyle("/account")
            }>My Accounts</Typography>
          </Link>

          <Link
            to="/reservations"
            style={getLinkStyle("/reservations")}

            onMouseEnter={(e) => (e.currentTarget.style.color = "#1976d2")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
          >
            <Typography sx={ getLinkStyle("/reservations")
            }>My Reservations</Typography>
          </Link>
          {role === "employee" || role === "admin" && (
            <Link
              to="/admin-parks"
              style={getLinkStyle("/admin-parks")}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1976d2")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
            >
              <Typography  sx={ getLinkStyle("/admin-parks")}>Admin Panel</Typography>
            </Link>
          )}
        </Box>
          <Button
            startIcon={<ExitToApp />}
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default AnimatedNavBar;
