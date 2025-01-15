import { AppBar, Toolbar, Typography,  Button,} from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { motion } from "framer-motion";
import {useScrollVisibility} from "src/hooks";

import { useNavigate  } from "react-router-dom";

const AnimatedNavBar = () => {
    const isVisible = useScrollVisibility();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userToken'); 
        sessionStorage.clear();
        navigate("/login", { replace: true });        
      };
  return (
    <motion.div
      style={{ position: "fixed", width: "100%", zIndex: 10 }}
      animate={{
        y: isVisible ? 0: -300,
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
