import { useState, useMemo } from "react";
import { InputAdornment, Stack, TextField } from "@mui/material";
import { DatePicker, StaticTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import { RentForm } from "src/types/RentForm";
import { Park } from "src/types/Park";
import { Control, Controller, useController, useWatch } from "react-hook-form";

// Extend Day.js with necessary plugins
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

type Props = {
  control: Control<RentForm>;
  park: Park;
};

export default function ParkForm({ park, control }: Props) {
  const [isToday, setIsToday] = useState(true);
  const { field: timeField } = useController({ name: "time", control });
  const data = useWatch({ control });

  // Combine date and time into a single Dayjs object
  const selectedDateTime = useMemo(() => {
    const date = dayjs(data.date);
    const time = dayjs(data.time);
    return date.hour(time.hour()).minute(time.minute());
  }, [data.date, data.time]);

  // Calculate disabled time slots based on park's rentTime and selected duration
  const disabledTimes = useMemo(() => {
    return park.rentTime.map((rent) => {
      const start = dayjs(rent.startDateTime);
      const end = start.add(rent.duration, "hour");
      return { start, end };
    });
  }, [park.rentTime]);

  const shouldDisableTime = (time: Dayjs) => {
    const date = dayjs(data.date);
    const timeWithDate = date.hour(time.hour()).minute(time.minute());
    return disabledTimes.some(({ start, end: reservedEnd }) =>
      timeWithDate.isBetween(start, reservedEnd, "minute", "[)")
    );
  };

  return (
    <Stack
      width={"100%"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Controller
        name="date"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <DatePicker
            disablePast
            label={"Date"}
            value={dayjs(field.value)}
            onChange={(value) => {
              const date = value?.toDate().toLocaleDateString("sv-Se");
              if (typeof date === "string") {
                field.onChange(date);
                const today = new Date().toLocaleDateString("sv-Se");
                setIsToday(today === date);
                if (new Date(timeField.value) < new Date())
                  timeField.onChange(new Date().toLocaleString("sv-Se"));
              } else console.log("date is undefined", date, value);
            }}
            format="YYYY-MM-DD"
          />
        )}
      />
      <Controller
        name="time"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <StaticTimePicker
            value={dayjs(field.value)}
            onChange={(value) => {
              const time = value?.toDate().toLocaleString("sv-Se");
              if (typeof time === "string") field.onChange(time);
              else console.log("time is undefined", time, value);
            }}
            disablePast={isToday}
            shouldDisableTime={shouldDisableTime}
            slots={{
              actionBar: () => <></>,
            }}
          />
        )}
      />
      <Controller
        name="duration"
        control={control}
        rules={{
          required: true,
          validate: (value) => {
            const duration = value;
            if (duration <= 0) return "The duration must be a positive number";

            const end = selectedDateTime.add(duration, "hour");
            const isConflict = disabledTimes.some(
              ({ start, end: reservedEnd }) =>
                selectedDateTime.isBetween(
                  start,
                  reservedEnd,
                  "minute",
                  "[)"
                ) ||
                end.isBetween(start, reservedEnd, "minute", "(]") ||
                (selectedDateTime.isSameOrBefore(start) &&
                  end.isSameOrAfter(reservedEnd))
            );

            return !isConflict || "Selected time overlaps with reserved slots";
          },
        }}
        render={({ field, fieldState: { invalid, error } }) => (
          <TextField
            type="text"
            label="Duration"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">hour</InputAdornment>
                ),
                inputMode: "decimal", // Ensures appropriate keyboard on mobile
              },
            }}
            value={field.value}
            onChange={(e) => {
              const inputValue = e.target.value;

              // Allow only numbers and one decimal point
              if (/^\d*\.?\d*$/.test(inputValue)) {
                field.onChange(inputValue);
              }
            }}
            error={Boolean(error || invalid)}
            helperText={
              error?.message ?? ((error || invalid) && "Invalid value")
            }
          />
        )}
      />
    </Stack>
  );
}
