import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  Card,
  IconButton,
  Typography,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";

import {
  Logout as LogoutIcon,
  Refresh as RefreshIcon,
  Add as PlusIcon,
} from "@mui/icons-material";

import { Popup, NewAccountPopup } from "..";

import { api } from "src/utils";
import { Navbar } from "src/views/ShowParks/components";

export function Account() {
  const navigate = useNavigate();
  const [createPopupOpen, setCreatePopupOpen] = useState(false);
  const [popupState, setPopupState] = useState<{
    operation: "withdraw" | "deposit" | "operations";
    activeCard: number;
  } | null>(null);
  const [balances, setBalances] = useState<
    {
      id: number;
      name: string;
      balance: string;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const refreshBalance = async () => {
    setBalances([]);
    setLoading(true);
    setErrorMessage("");
    try {
      const { data: responseData } = await api.get("/accounts");

      if (responseData.message === "Accounts retrieved successfully") {
        // Save token to localStorage
        setBalances(responseData.accounts);
      } else {
        setErrorMessage(
          responseData.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error refreshing balance:", error);
      setErrorMessage("Error fetching balance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshBalance();
  }, []);

  return (
    <>
      <Box
        width={"100%"}
        minHeight={"100vh"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Navbar />
        <Box
          mt={1}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          {loading ? (
            <CircularProgress />
          ) : errorMessage ? (
            <Alert severity="error">{errorMessage}</Alert>
          ) : (
            <Stack>
              {balances.map((e) => (
                <Card
                  sx={{
                    width: "500px",
                    height: "250px",
                    borderRadius: "10px",
                    mt: 3,
                    p: 5,
                    pt: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    width={"500px"}
                    height={"250px"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography variant="h3">{e.name}</Typography>
                    <Typography variant="subtitle1">
                      Your balance is:
                    </Typography>
                    <Typography variant="h4">
                      {e.balance} {"S.P."}
                    </Typography>
                  </Box>
                  <Box
                    width={"500px"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setPopupState({
                          operation: "withdraw",
                          activeCard: e.id,
                        });
                      }}
                    >
                      Withdraw
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => {
                        setPopupState({
                          operation: "operations",
                          activeCard: e.id,
                        });
                      }}
                    >
                      Operations
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => {
                        setPopupState({
                          operation: "deposit",
                          activeCard: e.id,
                        });
                      }}
                    >
                      Deposit
                    </Button>
                  </Box>
                </Card>
              ))}
              <Card
                sx={{
                  width: "500px",
                  height: "50px",
                  borderRadius: "10px",
                  mt: 3,
                  p: 5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button>
                  <Box
                    width={"500px"}
                    height={"250px"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    onClick={() => {
                      setCreatePopupOpen(true);
                    }}
                  >
                    <PlusIcon fontSize="large" color="primary" />
                  </Box>
                </Button>
              </Card>
            </Stack>
          )}
        </Box>
      </Box>
      {popupState ? (
        <Popup
          close={() => {
            setPopupState(null);
            refreshBalance();
          }}
          popupState={popupState}
        />
      ) : null}
      {createPopupOpen ? (
        <NewAccountPopup
          close={() => {
            setCreatePopupOpen(false);
            refreshBalance();
          }}
        />
      ) : null}
    </>
  );
}
