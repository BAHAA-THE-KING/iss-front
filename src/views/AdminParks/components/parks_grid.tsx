import { Grid,Box} from "@mui/material";
import { useEffect } from "react";
import {ListTile} from "./index"
import { ParkDialogState } from "src/hooks/admin_parks_hook/parkState";
import ShimmerListTile from "./shimmer_list_tile";
import ParkDialog from "./park_dialog";

interface ParkGirdProps {
  parkDialogState: ParkDialogState;
}

const ParksGrid : React.FC<ParkGirdProps> = ({ parkDialogState }) =>{
    
  useEffect(() => {
    fetchParks();
  }, []);

  const {
    loading,
    data,
    fetchParks,
    handleEdit,
    handleDelete,
  } = parkDialogState;
                
  return (
    <div>
    <Grid container spacing={3} sx={{ padding: 3, }}>
    {loading? Array.from(new Array(6)).map((_, index) => ( 
              <Grid item xs={20} sm={20} md={20} lg={6} key={index}>
                <ShimmerListTile />
              </Grid>
            )) : data.length == 0 ? <Box sx={{
              height: '100%', 
              width: '100%',  
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',    
              backgroundColor: 'lightgray', 
            }}>
              <h1>No Parks</h1>
              </Box> : data.map((item) => (
              <Grid item xs={20} sm={20} md={20} lg={6} key={item.id}>
                <ListTile
                  title={item.name}
                  subtitle={item.description}
                  trailing={item.price + " SPY"}
                  onDelete={()=> handleDelete(item)}
                  onEdit={()=>handleEdit(item)}
                />
              </Grid>))}
  </Grid>
  <ParkDialog parkDialogState={parkDialogState}/>
  </div>
  );
};

export default ParksGrid;
