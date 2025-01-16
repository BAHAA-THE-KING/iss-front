import { Grid, Dialog, DialogTitle,Card, CardContent, Skeleton,DialogContent, DialogActions, TextField, Button,Typography } from "@mui/material";
import {ListTile} from "../components";
import { useEffect, useState } from "react";
import { api } from "src/utils";
import axios from "axios";

import {useParkDialog} from "src/hooks"; 
import {Park} from "src/models/parks"
const ParksGrid = () => {


            const [data, setData] = useState<Park[]>([]);
            const [loading, setLoading] = useState<boolean>(true);


            const fetchParks = async () => {
              try {
                const response = await axios.get("/park/all");
                setData(response.data.parks);
              } catch (error) {
                console.error("Error fetching parks:", error);
              } finally {
                setLoading(false);
              }
            };
          
            useEffect(() => {
              fetchParks();
            }, []);

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
              handleEdit,
              handleDelete,
            } = useParkDialog([]);

            const ShimmerTile = () => (
              <Card>
                <Skeleton variant="rectangular" height={150} />
                <CardContent>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="40%" />
                </CardContent>
              </Card>
            );
                
  return (
    <div>
    <Grid container spacing={3} sx={{ padding: 3, paddingTop: "70px"}}>
      <Grid item xs={20} sm={20} md={20} lg={6} >
         { Array.from(new Array(6)).map((_, index) => ( // Display 6 shimmer tiles
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ShimmerTile />
              </Grid>
            ))}
          
      </Grid>
    {/* {data.map((item) => (
      <Grid item xs={20} sm={20} md={20} lg={6} key={item.id}>
         {loading
          ? Array.from(new Array(6)).map((_, index) => ( // Display 6 shimmer tiles
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ShimmerTile />
              </Grid>
            ))
          : data.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <ListTile
                  image={item.image || "https://via.placeholder.com/150"}
                  title={item.name}
                  subtitle={item.description}
                  trailing={item.price + " SPY"}
                  onDelete={()=> handleDelete(item.id)}
                  onEdit={()=>handleEdit(item)}
                />
              </Grid>
            ))}
      </Grid>
    ))} */}
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
