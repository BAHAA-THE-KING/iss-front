import { Badge, Box, Button, Stack, Typography } from "@mui/material";

import bg from "src/assets/bg.jpg";
import { Park } from "src/types/Park";

type Props = {
  parks: Park[];
};

export default function Parks({ parks }: Props) {
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
        bgcolor: "#FEFEFEAA",
        py: 3,
      }}
      color={"black"}
      overflow={"auto"}
    >
      {parks.map((park) => (
        <Box
          key={park.id}
          width={"95%"}
          height={"125px"}
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
              <img
                src={park.image}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
            <Box>{park.price}/hr</Box>
            <Button
              variant="contained"
              sx={{
                width: "125px",
                borderRadius: 0,
                bgcolor: "#003e7e",
                me: 1,
              }}
            >
              Rent
            </Button>
          </Stack>
        </Box>
      ))}
    </Box>
  );
}
