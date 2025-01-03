import { Box, TextField, IconButton, InputAdornment, Button , Typography  } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router"; 


export default function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleLogin = () => {
    // Validate input
    const newErrors: { username?: string; password?: string } = {};

    if (username.length < 4) {
      newErrors.username = "Username must be at least 4 characters long.";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set error messages
      return;
    }

    // If no errors, navigate to the next screen after successful login
    navigate("/show-parks"); // Use your desired route
  };

  const handleRegisterClick = () => {
    console.log("hello"); // This will print "hello" for now; modify it later
  };


  return (
       <Box
      sx={{
        position: "absolute", // Absolute positioning to move it freely
        top: "50%", // Center vertically
        right: "12%", // Margin from the right side of the screen
        transform: "translateY(-50%)", // Ensure it's exactly centered vertically
        width: "35%",
        height: "50%",
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <h2 color="#325677">Welcome Again</h2>

      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        sx={{
          marginBottom: "15px",
          "& .MuiOutlinedInput-root.Mui-focused": {
            borderColor: "#eab552", // Change focus color
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
            borderColor: "#eab552", // Change focus color
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
       <Typography variant="body2" sx={{ 
        marginBottom: "6%" ,
       textAlign: "left", width: "100%" ,
}}>
        If you don't have an account,{" "}
        <span
          onClick={handleRegisterClick}
          style={{ color: "#325677", cursor: "pointer", fontWeight: "bold" }}
        >
          register
        </span>
      </Typography>
      <Button
        variant="contained"
        onClick={handleLogin}
        sx={{
          width: "100%",
          backgroundColor: "#eab552", 
          "&:hover": {
            backgroundColor: "#d89f3d",
          },
        }}
      >
        Login
      </Button>
    </Box>

  );
}
