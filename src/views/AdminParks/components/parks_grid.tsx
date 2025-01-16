import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button,Typography } from "@mui/material";
import {ListTile} from "../components";
import { useState } from "react";
const ParksGrid = () => {

    const initialData  = [
        {
          id: 1,
          image: "https://via.placeholder.com/50",
          name: "Title 1",
          description: "Subtitle 1",
          price: "100",
        },
        {
          id: 2,
          image: "https://via.placeholder.com/50",
          name: "Title 2",
          description: "Subtitle 2",
          price: "200",
        },
        {
          id: 3,
          image: "https://via.placeholder.com/50",
          name: "Title 3",
          description: "Subtitle 3",
          price: "300",
        },
            ];

            const [data, setData] = useState(initialData);
            const [parkName, setParkName] = useState<string>("");
            const [parkDescription, setParkDescription] = useState<string>("");
            const [parkRentPrice, setParkRentPrice] = useState<string>("0");
            const [isCreate, setIsCreate] = useState<boolean>(true);
            const [selectedId, setSelectedId] = useState<number | null>(null); // Track selected item

            const [open, setOpen] = useState(false);

            const handleOpen = () => {
              setOpen(true);
            };
          
            const handleClose = () => {
              setOpen(false);
              restData();
            };

            const handleDelete = (id: number) => {
              setData((data) => data.filter((item) => item.id !== id));
            };

            const handleEdit = (item: any) => {
              setIsCreate(false);
              setSelectedId(item.id);
              setParkName(item.name);
              setParkDescription(item.description);
              setParkRentPrice(item.price);
              handleOpen();
            };

            const restData = ()=> {
              setParkName("");
              setParkDescription("");
              setParkRentPrice("");
            }

            const handleConfirm = () => {
              if (isCreate) {
                const newItem = {
                  id: data.length + 1, 
                  image: "https://via.placeholder.com/50", 
                  name: parkName,
                  description: parkDescription,
                  price: parkRentPrice,
                };
                setData((prevData) => [...prevData, newItem]);
              } else if (selectedId !== null) {
                const updatedData = data.map((item) =>
                  item.id === selectedId
                    ? {
                        ...item,
                        name: parkName,
                        description: parkDescription,
                        price: parkRentPrice,
                      }
                    : item
                );
                setData(updatedData);
              }
          
              handleClose(); // Close dialog and reset inputs
            };
                
  return (
    <div>
    <Grid container spacing={3} sx={{ padding: 3, paddingTop: "70px"}}>
    {data.map((item) => (
      <Grid item xs={20} sm={20} md={20} lg={6} key={item.id}>
        <ListTile
          image={item.image}
          title={item.name}
          subtitle={item.description}
          trailing={item.price + " SPY"}
          onDelete={() => handleDelete(item.id)}
          onEdit={()=> handleEdit(item)}
        />
      </Grid>
    ))}
  </Grid>
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
  </div>
  );
};

export default ParksGrid;
