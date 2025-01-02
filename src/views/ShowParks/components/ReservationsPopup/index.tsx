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
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  styled,
  Typography,
} from "@mui/material";

import { Close as CloseIcon } from "@mui/icons-material";

import { ParkForm, PaymentForm } from "..";

import { Park } from "src/types/Park";

import fakeData from "src/fakeData";
import { Card as CardType } from "src/types/Card";

type Props = {
  close: () => void;
  parkId: number;
};

export default function ReservationsPopup({ close, parkId }: Props) {
  const [park, setPark] = useState<Park>();
  const [cards, setCards] = useState<CardType[]>(fakeData.cards);
  const [date, setDate] = useState<string>(
    new Date().toLocaleDateString("sv-Se")
  );
  const [time, setTime] = useState<string>(new Date().toLocaleString("sv-Se"));
  const [duration, setDuration] = useState<number>(0);
  const [cardId, setCardId] = useState<number>(0);
  const [pin, setPin] = useState<string>("");

  useEffect(() => {
    // TODO: get data
    if (parkId) setPark(fakeData.parks.find((p) => p.id === parkId));
    setDate(new Date().toLocaleDateString("sv-Se"));
    setTime(new Date().toLocaleString("sv-Se"));
    setDuration(0);
    setActiveStep(0);
  }, [parkId]);

  const steps = useMemo(
    () => [
      {
        label: "Choose a Time",
        component: (
          <ParkForm
            key={"ParkForm"}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            duration={duration}
            setDuration={setDuration}
          />
        ),
      },
      {
        label: "Enter Payment Info",
        component: (
          <PaymentForm
            key="PaymentForm"
            cards={cards}
            pin={pin}
            setPin={setPin}
          />
        ),
      },
    ],
    [date, time, duration, cards, pin]
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
                connector={<QontoConnector />}
              >
                {steps.map(({ label }, index) => (
                  <Step key={label}>
                    <StepLabel>
                      <Typography
                        sx={(theme) => ({
                          color:
                            index < activeStep
                              ? theme.palette.primary.main
                              : "",
                        })}
                      >
                        {label}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
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

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`& .${stepConnectorClasses.line}`]: {
    position: "relative",
    borderColor: "#eaeaf0", // Gray base line
    borderTopWidth: 3,
    borderRadius: 1,
    "::after": {
      content: '""',
      position: "absolute",
      top: "-2.5px",
      left: 0,
      width: "0%", // Initial state for growing line
      height: "2.5px",
      backgroundColor: theme.palette.primary.main, // Blue growing line
      borderRadius: 100,
      transition: "width 0.6s ease-in-out", // Animation for growing line
    },
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}::after`]: {
    width: "100%", // Fully grown for active step
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}::after`]:
    {
      width: "100%", // Fully grown for completed step
    },
}));
