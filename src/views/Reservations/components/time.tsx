import { Typography } from "@mui/material";
import { format, addHours } from "date-fns";

type TimeProps = {
  startTime: string;
  duration: number; 
};

const TimeDetails = ({ startTime, duration }: TimeProps) => {
  const startDateTime = new Date(startTime);

  const formattedStartTime = format(startDateTime, "yyyy-MM-dd HH:mm");

  const endDateTime = addHours(startDateTime, duration);
  const formattedEndTime = format(endDateTime, "yyyy-MM-dd HH:mm");

  return (
    <div>
      <Typography variant="body2" color="text.secondary">{formattedStartTime}   -   {formattedEndTime}</Typography>
    </div>
  );
};

export default TimeDetails;
