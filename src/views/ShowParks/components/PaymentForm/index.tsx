import { MenuItem, Stack, TextField } from "@mui/material";
import { Card } from "src/types/Card";

type Props = {
  cards: Card[];
  pin: string;
  setPin: any;
};

export default function PaymentForm({ cards, pin, setPin }: Props) {
  return (
    <Stack
      width={"100%"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <TextField sx={{ width: "320px" }} select defaultValue={cards[0].id}>
        {cards.map((card) => (
          <MenuItem value={card.id}>
            {card.name} - ${card.balance}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label={"PIN"}
        sx={{ width: "320px", mt: 3 }}
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
    </Stack>
  );
}
