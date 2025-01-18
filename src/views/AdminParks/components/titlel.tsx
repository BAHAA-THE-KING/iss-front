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
         marginTop: "70px",
         paddingTop: "10px",
         borderRadius: "15px",
         backgroundColor:"#fff",
         boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
         paddingBottom: "10px",
         paddingInline:"20px"
      }}
    >
      <Typography variant="body1" style={{ fontWeight: "bold", fontSize:"20px" }}>All Parks </Typography>
      <Typography variant="body1"style={{ fontWeight: "bold" ,fontSize:"20px" }}> ({data.length})</Typography>
      <Fab
      size="small"
      sx={{
        marginLeft:"1%",
        color:"white",
          "&:hover": {
            color: "#325677",
          },
        backgroundColor:"#325677"
      }}
      onClick={()=>{
        console.log('hello');
        handleCreate();
      }}
      aria-label="Add park">
        <AddIcon 
        sx=
        {{
          height:"20px",
        }}
        />
      </Fab>
    </Box>
    </>
  );
};

export default Title;
