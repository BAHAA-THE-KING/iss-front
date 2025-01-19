import { useState } from "react";
import {
  Button,
  Card,
  Grid2 as Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

import { api } from "src/utils";

import {
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

type Props = {
  close: () => void;
};

export function NewAccountPopup({ close }: Props) {
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreation = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const payload = {
        pin,
        name,
      };

      // Send the encrypted amount to the server
      await api.post(`/accounts/new`, payload);
    } catch {
      setError(
        "An error occurred while creating your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open
      onClose={close}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card sx={{ width: "650px", height: "400px", p: 4, overflow: "auto" }}>
        <Grid container>
          <Grid size={12} display={"flex"} justifyContent={"flex-end"}>
            <IconButton onClick={close}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid size={12} display={"flex"} justifyContent={"center"}>
            <Typography variant="h4" textAlign={"center"}>
              Create a new account
            </Typography>
          </Grid>
          <Grid size={12} height={"30px"}></Grid>
          <Grid
            size={6}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"flex-end"}
          >
            <TextField
              variant="outlined"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ my: 3, width: "80%" }}
              error={!!error}
              helperText={error || ""}
            />
          </Grid>
          <Grid
            size={6}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"flex-end"}
          >
            <TextField
              variant="outlined"
              label="Pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              sx={{ my: 3, width: "80%" }}
              type={showPass ? "password" : "text"}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton onClick={() => setShowPass(!showPass)}>
                      {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  ),
                },
              }}
              error={!!error}
              helperText={error || ""}
            />
          </Grid>
          <Grid
            size={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"flex-end"}
          >
            <Button
              variant="contained"
              onClick={handleCreation}
              disabled={loading || !name || !pin}
              sx={{ width: "50%", height: "50px" }}
            >
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Grid>
          <Grid size={12} display={"flex"} justifyContent={"center"} mt={2}>
            {success && <Typography color="success.main">{success}</Typography>}
          </Grid>
        </Grid>
      </Card>
    </Modal>
  );
}
