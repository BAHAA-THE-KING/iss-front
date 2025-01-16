import { Control, Controller, useController } from "react-hook-form";
import { MenuItem, Stack, TextField, Typography } from "@mui/material";

import { Card } from "src/types/Card";
import { Park } from "src/types/Park";
import { RentForm } from "src/types/RentForm";

type Props = {
  cards: Card[];
  park: Park;
  control: Control<RentForm>;
};

export default function PaymentForm({ cards, park, control }: Props) {
  const { field: pinField } = useController({ control, name: "pin" });
  const { field: durationField } = useController({ control, name: "duration" });

  return (
    <Stack
      width={"100%"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography variant="h6">
        This will cost: ${park.price * Number(durationField.value)}
      </Typography>
      <Controller
        name="cardId"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { invalid, error } }) => (
          <TextField
            sx={{ width: "320px" }}
            select
            value={field.value}
            onChange={(e) => {
              field.onChange(e.target.value);
              pinField.onChange("");
            }}
            error={Boolean(error || invalid)}
            helperText={
              error?.message ?? ((error || invalid) && "Invalid value")
            }
          >
            {cards.map((card) => (
              <MenuItem key={card.id} value={card.id}>
                {card.name} - ${card.balance}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="pin"
        control={control}
        rules={{
          required: true,
          validate: (value) =>
            /^\d\d\d\d$/.test(value.toString()) ||
            "The pin must be 4 digits number",
        }}
        render={({ field, fieldState: { invalid, error } }) => (
          <TextField
            label={"PIN"}
            sx={{ width: "320px", mt: 3 }}
            value={field.value}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 4 && /^\d*$/.test(value.toString())) {
                field.onChange(value);
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
