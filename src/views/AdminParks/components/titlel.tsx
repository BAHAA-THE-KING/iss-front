import { ParkDialogState } from "src/hooks/admin_parks_hook/parkState";
import {Fab,Box,Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'

interface TitleProps {
  parkDialogState: ParkDialogState;
}


const Title: React.FC<TitleProps> = ({ parkDialogState }) =>  {

    const {
      handleCreate,
      data,

    } = parkDialogState;
  
    return (
      <>
    <Box
      sx={{
        display: "flex",
        alignItems:"center",
        marginBottom:1,
         paddingTop: "80px",
         backgroundColor:"Window",
         paddingBottom: "10px",
         paddingInline:"20px"
      }}
    >
      <Typography variant="body1" style={{ fontWeight: "bold" }}>All Parks </Typography>
      <Typography variant="body1"style={{ fontWeight: "bold" }}> ({data.length})</Typography>
      <Fab
      color="primary"
      size="small"
      sx={{
        marginLeft:"1%",
        backgroundColor:"slateblue"
      }}
      onClick={()=>{
        console.log('hello');
        handleCreate();
      }}
      aria-label="Add park">
        <AddIcon 
        sx=
        {{
          height:"20px"
        }}
        />
      </Fab>
    </Box>
    </>
  );
};

export default Title;
