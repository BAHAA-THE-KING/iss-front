import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Grid2 as Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

import { api } from "src/utils";

import {
  Close as CloseIcon,
  ArrowUpward as DepositIcon,
  ArrowDownward as WithdrawIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

type Props = {
  popupState: {
    operation: "withdraw" | "deposit" | "operations";
    activeCard: number;
  };
  close: () => void;
};

export function Popup({ close, popupState: { activeCard, operation } }: Props) {
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [operations, setOperations] = useState<
    { type: "withdraw" | "deposit"; amount: number }[]
  >([]);

  const navigate = useNavigate();

  const handleTransaction = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const payload = {
        type: operation,
        amount,
      };

      // Send the encrypted amount to the server
      const { data: responseData } = await api.post(
        `/accounts/${activeCard}/transaction`,
        payload
      );

      if (responseData.message === "Transaction successful") {
        setSuccess(
          operation === "withdraw"
            ? "Withdrawal successful!"
            : "Deposit successful!"
        );
        setAmount("");
      }
    } catch {
      setError(
        "An error occurred while processing your transaction. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (operation === "operations") {
      setLoading(true);
      api
        .get(`/accounts/${activeCard}/operations`)
        .then(({ data: responseData }) => {
          setOperations(responseData.data.operations);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

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
              {operation === "withdraw"
                ? "Enter the withdrawal amount"
                : operation === "deposit"
                ? "Enter the deposit amount"
                : "Account's operations"}
            </Typography>
          </Grid>
          <Grid size={12} height={"30px"}></Grid>
          {operation === "operations" ? (
            <Grid
              size={12}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"flex-end"}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                  }}
                >
                  {operations.map((e) =>
                    e.type === "withdraw" ? (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <WithdrawIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={e.type}
                          secondary={e.amount + " S.P."}
                        />
                      </ListItem>
                    ) : (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <DepositIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={e.type}
                          secondary={e.amount + " S.P."}
                        />
                      </ListItem>
                    )
                  )}
                </List>
              )}
            </Grid>
          ) : (
            <>
              <Grid
                size={12}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"flex-end"}
              >
                <TextField
                  variant="outlined"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  sx={{ my: 3, width: "80%" }}
                  type="number"
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
                  onClick={handleTransaction}
                  disabled={loading || !amount}
                  sx={{ width: "50%", height: "50px" }}
                >
                  {loading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
              </Grid>
            </>
          )}
          <Grid size={12} display={"flex"} justifyContent={"center"} mt={2}>
            {success && <Typography color="success.main">{success}</Typography>}
          </Grid>
        </Grid>
      </Card>
    </Modal>
  );
}
