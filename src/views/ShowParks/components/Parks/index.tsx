import { useState } from "react";
import { Badge, Box, Button, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

import ReservationsPopup from "../ReservationsPopup";

import { Park } from "src/types/Park";

import bg from "src/assets/bg.jpg";
import { useParks } from "../../data";

export default function Parks() {
  const { parks, error } = useParks();
  const [park, setPark] = useState<Park | null>(null);

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
                <Button
                  variant="contained"
                  sx={{
                    width: "125px",
                    borderRadius: 0,
                    bgcolor: "#003e7e",
                    me: 1,
                  }}
                  onClick={() => setPark(park)}
                >
                  Rent
                </Button>
              </motion.div>
            </Stack>
          </Box>
        </motion.div>
      ))}
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
      {park ? (
        <ReservationsPopup close={() => setPark(null)} park={park} />
      ) : null}
    </Box>
  );
}
