import {  Dialog, DialogTitle,DialogContent, DialogActions, TextField, Button,Typography } from "@mui/material";
import { ParkDialogState } from "src/hooks/admin_parks_hook/parkState";

interface ParkDialogProps {
  parkDialogState: ParkDialogState;
}
  const ParkDialog : React.FC<ParkDialogProps> = ({ parkDialogState }) => {

    const {
      parkName,
      setParkName,
      parkDescription,
      setParkDescription,
      parkRentPrice,
      setParkRentPrice,
      isCreate,
      open,
      handleClose,
      handleConfirm,
    } = parkDialogState;
  
    return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
        {isCreate?  'Create new park': "Edit park"}
          </Typography>
        </DialogTitle>
        <DialogContent>
        <TextField
            label="Park Name"
            fullWidth
            margin="normal"
            value={parkName}
            onChange={(e) => setParkName(e.target.value)}
          />
          <TextField
            label="Park Description"
            fullWidth
            margin="normal"
            value={parkDescription}
            onChange={(e) => setParkDescription(e.target.value)}
          />
          <TextField
            label="Park Rent Price"
            type="number"
            fullWidth
            margin="normal"
            value={parkRentPrice}
            onChange={(e) => setParkRentPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color:"red"}}>
            Close
          </Button>
          <Button onClick={handleConfirm} sx={{color:"darkslategray"}}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default ParkDialog;
