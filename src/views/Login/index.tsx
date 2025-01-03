import { Box } from "@mui/material";
import { BackgroundImage , BackgroundContainer , AuthSwitcher} from "./components";

export function Login() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <BackgroundImage />
      <BackgroundContainer />
      <AuthSwitcher />

    </Box>
  );
}
