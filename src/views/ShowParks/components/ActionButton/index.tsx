import { Button, SxProps, Theme } from "@mui/material";
import React from "react";

type Props = {
  sx?: SxProps<Theme>;
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function ActionButton({ sx = {}, onClick, children }: Props) {
  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: 0,
        bgcolor: "#003e7e",
        me: 1,
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
