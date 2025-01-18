import { Box  } from "@mui/material";
import { AnimatedNavBar , ParksGird ,Title} from "./components";
import { useRequiredAuth } from "src/hooks";
import {useParkDialog} from "src/hooks";

export function AdminParks() {
  useRequiredAuth(["employee", "admin"]);
  const parkDialogState = useParkDialog();

  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <AnimatedNavBar />
      <Title parkDialogState={parkDialogState}/>
      <ParksGird parkDialogState={parkDialogState}/>
    </Box>
  );
}
