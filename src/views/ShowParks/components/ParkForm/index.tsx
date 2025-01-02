import { useEffect, useState } from "react";
import { InputAdornment, Stack, TextField } from "@mui/material";
import { DatePicker, StaticTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type Props = {
  date: string;
  setDate: any;
  time: string;
  setTime: any;
  duration: number;
  setDuration: any;
};

export default function ParkForm({
  date,
  setDate,
  time,
  setTime,
  duration,
  setDuration,
}: Props) {
  // TODO: Add validation
  const [isToday, setIsToday] = useState(true);

  useEffect(() => {
    const today = new Date().toLocaleDateString("sv-Se");
    setIsToday(today === date);
    if (new Date(time) < new Date())
      setTime(new Date().toLocaleString("sv-Se"));
  }, [date]);

  return (
    <Stack
      width={"100%"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <DatePicker
        disablePast
        label={"Date"}
        value={dayjs(new Date(date))}
        onChange={(value) => {
          const date = value?.toDate().toLocaleDateString("sv-Se");
          if (typeof date === "string") setDate(date);
          else console.log("time is undefined", date, value);
        }}
        format="YYYY-MM-DD"
      />
      <StaticTimePicker
        value={dayjs(new Date(time))}
        onChange={(value) => {
          const time = value?.toDate().toLocaleString("sv-Se");
          if (typeof time === "string") setTime(time);
          else console.log("time is undefined", time, value);
        }}
        disablePast={isToday}
        slots={{
          actionBar: () => <></>,
        }}
      />
      <TextField
        type="number"
        label="Duration"
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">hour</InputAdornment>,
          },
        }}
        value={duration}
        onChange={(ev) => setDuration(ev.target.value)}
      />
    </Stack>
  );
}
