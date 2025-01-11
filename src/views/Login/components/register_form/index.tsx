import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useLoginForm } from "src/hooks";
import { motion } from "framer-motion";

export default function RegisterForm({
  handleSwitch,
}: {
  handleSwitch: () => void;
}) {
  const navigate = useNavigate();

  const {
    username,
    password,
    repeatPassword,
    showPassword,
    errors,
    setUsername,
    setPassword,
    setShowPassword,
    setRepeatPassword,
    handleRegister,
  } = useLoginForm();

  const handleSubmit = async () => {
    if (await handleRegister()) {
      navigate("/show-parks");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{
        position: "absolute",
        width: "35%",
        height: "80%",
        top: "20%",
        right: "15%",
        transform: "translateY(-10%)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          border: `2px solid #eab552`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Create an Account
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          style={{ width: "100%", marginBottom: "20px" }}
        >
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{
              marginBottom: "15px",
              "& .MuiOutlinedInput-root.Mui-focused": {
                borderColor: "#eab552",
              },
            }}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{
              marginBottom: "15px",
              "& .MuiOutlinedInput-root.Mui-focused": {
                borderColor: "#eab552",
              },
            }}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Repeat Password"
            variant="outlined"
            type={"password"}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            fullWidth
            sx={{
              marginBottom: "15px",
              "& .MuiOutlinedInput-root.Mui-focused": {
                borderColor: "#eab552",
              },
            }}
            error={!!errors.repeatedPass}
            helperText={errors.repeatedPass}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{
            width: "100%",
          }}
        >
          <Typography
            variant="body2"
            sx={{ marginBottom: "6%", textAlign: "left", width: "100%" }}
          >
            Already have an account?{" "}
            <span
              onClick={handleSwitch}
              style={{
                color: "#325677",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Login
            </span>
          </Typography>
        </motion.div>

        <motion.button
          onClick={handleSubmit}
          whileTap={{ scale: 0.9 }}
          whileHover={{
            scale: 1.1,
            backgroundColor: "#d89f3d",
            color: "black",
          }}
          transition={{
            bounceDamping: 10,
            bounceStiffness: 600,
          }}
          style={{
            width: "70%",
            padding: "7px 0",
            backgroundColor: "#eab552", // Same color as before
            color: "#fff",
            borderRadius: "8px", // Radius like before
            fontSize: "16px", // Font size like before
            fontWeight: "lighter", // Same font weight as before
            cursor: "pointer",
            textAlign: "center",
            border: "none",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow
          }}
        >
          Register
        </motion.button>
      </Box>
    </motion.div>
  );
}
