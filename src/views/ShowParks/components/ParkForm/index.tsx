import { InputAdornment, Stack, TextField } from "@mui/material";
import { DatePicker, StaticTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type Props = {
  setDate: any;
  setTime: any;
  setDuration: any;
};

export default function ParkForm({ setDate, setTime, setDuration }: Props) {
  // TODO: Add validation
  return (
    <Stack
      width={"100%"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <DatePicker
        label={"Date"}
        defaultValue={dayjs(new Date())}
        onChange={(value) => {
          const date = value?.toDate().toLocaleDateString("sv-Se");
          if (typeof date === "string") setDate(date);
          else console.log("time is undefined", date, value);
        }}
        format="YYYY-MM-DD"
      />
      <StaticTimePicker
        defaultValue={dayjs(new Date())}
        slots={{
          actionBar: () => <></>,
        }}
        onChange={(value) => {
          const time = value?.toDate().toLocaleString("sv-Se");
          if (typeof time === "string") setTime(time);
          else console.log("time is undefined", time, value);
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
        onChange={(ev) => setDuration(ev.target.value)}
      />
    </Stack>
  );
}
