import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid2,
  IconButton,
  Modal,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";

import { Close as CloseIcon } from "@mui/icons-material";

import { ParkForm, Navbar } from "..";

type Props = {
  close: () => void;
  parkId: number;
};

export default function ReservationsPopup({ close, parkId }: Props) {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);

  // TODO: get data and intersect with time

  useEffect(() => {
    setDate("");
    setTime("");
    setDuration(0);
  }, [parkId]);

  const steps = useMemo(
    () => [
      {
        label: "Choose a Time",
        component: (
          <ParkForm
            key={"ParkForm"}
            setDate={setDate}
            setTime={setTime}
            setDuration={setDuration}
          />
        ),
      },
      {
        label: "Enter Payment Info",
        component: <Navbar key="Navbar" />,
      },
    ],
    []
  );

  const [activeStep, setActiveStep] = useState(0);
  const handleBack = () => activeStep > 0 && setActiveStep(activeStep - 1);
  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
    else {
      setActiveStep(steps.length - 1);
      // TODO: send data
    }
  };

  return (
    <Modal open={Boolean(parkId)} onClose={close}>
      <Stack
        width={"100%"}
        height={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Card
          sx={{
            width: "50%",
            minWidth: "400px",
            height: "90%",
            borderRadius: "10px",
            p: 2,
            overflow: "auto",
          }}
        >
          <Grid2 container>
            <Grid2
              size={{ xs: 12 }}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <IconButton onClick={close}>
                <CloseIcon fontSize="large" />
              </IconButton>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Stepper
                activeStep={activeStep}
                sx={{
                  my: 3,
                }}
              >
                {steps.map(({ label }) => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Box width={"100%"} height={"480px"}>
                {steps[activeStep].component}
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                {activeStep !== 0 ? (
                  <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                ) : null}
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Rent" : "Next"}
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </Card>
      </Stack>
    </Modal>
  );
}
