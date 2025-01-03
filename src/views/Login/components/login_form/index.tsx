import { Box, TextField, IconButton, InputAdornment, Button , Typography  } from "@mui/material";
import { useLoginForm } from "src/hooks"; // Import the custom hook
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router"; 


export default function LoginForm() {
  const navigate = useNavigate();

 
  const {
    username,
    password,
    showPassword,
    errors,
    setUsername,
    setPassword,
    setShowPassword,
    handleLogin,
  } = useLoginForm();

  const handleSubmit = () => {
    if (handleLogin()) {
      navigate("/show-parks"); // Navigate on successful login
    }
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
          onClick={handleSubmit}
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
