import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
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
import { motion } from "framer-motion";

import { Close as CloseIcon } from "@mui/icons-material";

import { ParkForm, PaymentForm } from "..";
import { Park } from "src/types/Park";
import { RentForm } from "src/types/RentForm";

import { useCards, useMakeReservation } from "../../data";
import { useHandleError } from "src/hooks";

type Props = {
  close: () => void;
  park: Park | null;
};

export default function ReservationsPopup({ close, park }: Props) {
  const { cards, error: apiError } = useCards();
  const [error, setError] = useState<string | undefined>();
  const { control, reset, handleSubmit } = useForm<RentForm>({
    defaultValues: {
      date: new Date().toLocaleDateString("sv-Se"),
      time: new Date().toLocaleString("sv-Se"),
      duration: 0,
      cardId: cards?.[0]?.id ?? 1,
      pin: "",
    },
  });

  useEffect(() => {
    setError(undefined);
  }, []);

  useEffect(() => {
    setError(apiError);
  }, [apiError]);

  useEffect(() => {
    setActiveStep(0);
    reset({
      date: new Date().toLocaleDateString("sv-Se"),
      time: new Date().toLocaleString("sv-Se"),
      duration: 0,
      cardId: cards?.[0]?.id ?? 1,
      pin: "",
    });
  }, [park]);

  const steps = useMemo(
    () => [
      {
        label: "Choose a Time",
        component: <ParkForm key={"ParkForm"} park={park!} control={control} />,
      },
      {
        label: "Enter Payment Info",
        component: (
          <PaymentForm
            key="PaymentForm"
            cards={cards}
            park={park!}
            control={control}
          />
        ),
      },
    ],
    [park, cards, control]
  );

  const { makeReservation } = useMakeReservation();
  const { handleError } = useHandleError();

  const [activeStep, setActiveStep] = useState(0);
  const handleBack = () => activeStep > 0 && setActiveStep(activeStep - 1);
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // last step
      handleSubmit(async (data) => {
        try {
          const response = await makeReservation({
            ...data,
            parkId: park!.id,
            time: data.time.split(" ")[1],
          });
          handleError(response);
          setError(undefined);
          close();
        } catch (err: any) {
          setError(err.message);
        }
      })();
    } else {
      // check then proceed
      handleSubmit(() => {
        setActiveStep(activeStep + 1);
      })();
    }
  };

  return (
    <Modal open={Boolean(park)} onClose={close}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
      >
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
              maxHeight: "90%",
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
                {error ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Typography color="red" textAlign={"center"}>
                      {error}
                    </Typography>
                  </motion.div>
                ) : null}
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box width={"100%"}>{steps[activeStep].component}</Box>
                </motion.div>
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  {activeStep !== 0 ? (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        color="inherit"
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                    </motion.div>
                  ) : null}
                  <Box sx={{ flex: "1 1 auto" }} />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? "Rent" : "Next"}
                    </Button>
                  </motion.div>
                </Box>
              </Grid2>
            </Grid2>
          </Card>
        </Stack>
      </motion.div>
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
