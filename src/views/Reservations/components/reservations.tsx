import { useState } from "react";
import { Box, Stack, TextField, Typography ,Grid } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import  ActionButton  from "../../ShowParks/components/ActionButton";
import ShimmerListTile from "../../AdminParks/components/shimmer_list_tile";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useReservations } from "../data/use_reservations";
import parkImage from "src/assets/park.jpg";
import TimeDetails from "./time";

export default function Parks() {
  const [search, setSearch] = useState<string | undefined>("");
  const [date, setDate] = useState<string | undefined>("");
  const [time, setTime] = useState<string | undefined>("");

  const { reserves, error , loading } = useReservations({
    date,
    search,
    time: time?.split(" ")?.[1],
  });

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
        height:"100%",
        backgroundBlendMode: "color",
        backgroundAttachment: "fixed",
        bgcolor: "#FEFEFEAA",
        py: 2,
        minHeight: "CALC(100vh - 125px)",
      }}
      color={"black"}
      overflow={"auto"}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ width: "95%" ,marginTop:"60px",}}
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
      <div>
    <Grid container spacing={3} sx={{ padding: 3, }}>
    {loading? Array.from(new Array(6)).map((_, index) => ( 
              <Grid item xs={20} sm={20} md={20} lg={6} key={index}>
                <ShimmerListTile />
              </Grid>
            )) : reserves.length == 0 ? <Box sx={{
              height: '100%', 
              width: '100%',  
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',    
              backgroundColor: 'lightgray', 
            }}>
              <h1>No Parks</h1>
              </Box> : reserves.map((item) => (
              <Grid item xs={20} sm={20} md={20} lg={6} key={item.id}>
                    <motion.div
         initial={{ opacity: 0, y: -10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.7 }}
         style={{ width: "95%" }}
         whileHover={{
           scale: 1.02,
           transition: { duration: 0.3 },
         }}
         >
       <Box
         sx={{
           display: "flex",
           boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
           height:'70%',
           alignItems: "center",
           padding: "16px",
           border: "3px solid wheat",
           borderRadius: "8px",
           backgroundColor: "white",
         }}
       >
         <Box
           sx={{
             height: "100%",
             width:"20%",
             borderRadius: "50%",
             marginRight: "16px",
             objectFit: "cover",
           }}
         >
           <img
           src={parkImage}
           style={{
             height: "100%",
             width:"100%",
             objectFit: "cover",
             borderRadius:"15px"
           }}
         />
           </Box>
         <Box sx={{ flex: 1 }}>
           <Typography variant="h6" component="div">
             {item.Parking.name}
           </Typography>
           <Typography variant="body2" color="text.secondary">
           {item.Parking.description}
           </Typography>
           <TimeDetails startTime={item.startTime} duration={item.duration}/>
         </Box>
         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
           <Typography variant="body2">{item.cost} SPY
           </Typography>
         </Box>
       </Box>
       </motion.div>
              </Grid>))}
  </Grid>
  </div>
     

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
    </Box>
  );
}
