import { useState } from "react";
import { Badge, Box, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { motion } from "framer-motion";

import { ReservationsPopup, ActionButton } from "..";

import { Park } from "src/types/Park";

import bg from "src/assets/bg.jpg";

import { useParks } from "../../data";

export default function Parks() {
  const [search, setSearch] = useState<string | undefined>("");
  const [date, setDate] = useState<string | undefined>("");
  const [time, setTime] = useState<string | undefined>("");

  const { parks, error } = useParks({
    date,
    search,
    time: time?.split(" ")?.[1],
  });
  const [park, setPark] = useState<Park | null>(null);

  const reset = () => {
    setSearch(undefined);
    setDate(undefined);
    setTime(undefined);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      sx={{
        backgroundImage: `URL(${bg})`,
        backgroundSize: "100% 100%",
        backgroundBlendMode: "color",
        backgroundAttachment: "fixed",
        bgcolor: "#FEFEFEAA",
        py: 2,
        minHeight: "CALC(100vh - 125px)",
      }}
      color={"black"}
      overflow={"auto"}
    >
      {/* Filters Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ width: "95%" }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            mb: 3,
            p: 2,
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <TextField
            label="Search Parks"
            variant="outlined"
            size="small"
            value={search ?? ""}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: "40%" }}
          />
          <DatePicker
            label="Date"
            value={dayjs(date ?? "")}
            slotProps={{ textField: { variant: "outlined", size: "small" } }}
            onChange={(value) => {
              const date = value?.toDate().toLocaleDateString("sv-Se");
              if (typeof date === "string") {
                setDate(date);
              } else console.log("date is undefined", date, value);
            }}
            format="YYYY-MM-DD"
          />
          <TimePicker
            label="Time"
            slotProps={{
              textField: {
                variant: "outlined",
                size: "small",
              },
            }}
            value={dayjs(time ?? "")}
            onChange={(value) => {
              const time = value?.toDate()?.toLocaleString("sv-Se");
              if (typeof time === "string") setTime(time);
              else console.log("time is undefined", time, value);
            }}
          />
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <ActionButton onClick={reset}>Reset</ActionButton>
          </motion.div>
        </Stack>
      </motion.div>

      {/* Parks List */}
      {parks.map((park) => (
        <motion.div
          key={park.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          style={{
            width: "95%",
            height: "125px",
            margin: "10px 0",
          }}
        >
          <Box
            width={"100%"}
            height={"100%"}
            bgcolor={"white"}
            borderRadius={"10px"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"stretch"}
            my={1}
            p={1}
          >
            <Stack flexDirection={"row"}>
              <Box width={"250px"} height={"125px"} marginInlineEnd={"10px"}>
                <motion.img
                  src={park.image}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </Box>
              <Box>
                <Badge
                  variant="dot"
                  badgeContent={park.status + " Now"}
                  color={park.status === "free" ? "success" : "error"}
                >
                  <Typography variant="h5">{park.name}</Typography>
                </Badge>
                <Box>{park.description}</Box>
              </Box>
            </Stack>
            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              my={2}
              mx={3}
            >
              <Box>${park.price}/hr</Box>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ActionButton
                  sx={{ width: "125px" }}
                  onClick={() => setPark(park)}
                >
                  Rent
                </ActionButton>
              </motion.div>
            </Stack>
          </Box>
        </motion.div>
      ))}

      {/* Error Message */}
      {error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            width={"15%"}
            bgcolor={"white"}
            borderRadius={"10px"}
            my={1}
            p={1}
            py={3}
          >
            <Typography color="red" textAlign={"center"}>
              {error}
            </Typography>
          </Box>
        </motion.div>
      ) : null}

      {/* Reservations Popup */}
      {park ? (
        <ReservationsPopup close={() => setPark(null)} park={park} />
      ) : null}
    </Box>
  );
}
