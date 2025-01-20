import { ParkDialogState } from "src/hooks/admin_parks_hook/parkState";
import {Fab,Box,Typography ,TextField , IconButton , Menu,useMediaQuery  } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'
import FilterListIcon from "@mui/icons-material/FilterList";

import { useState } from "react";
import FilterMenuItem from "./filter_menu_item";
import FilterButtonItem from "./filter_button_item";



interface TitleProps {
  parkDialogState: ParkDialogState;
}


const Title: React.FC<TitleProps> = ({ parkDialogState }) =>  {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isMobileView = useMediaQuery("(max-width:790px)");
  const {
    handleCreate,
    filteredData,
    search,
    selectedFilter,
    filterList,
    setSearch,
    setSelectedFilter
  } = parkDialogState;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose =async (filter : string) => {
    setAnchorEl(null);
    if (filter) {
    setSelectedFilter(filter);
    await filterList(filter);
    }
  };
    
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
      <Typography variant="body1" style={{ fontWeight: "bold" }} sx={{
 fontSize: "15px", 
 "@media (min-width:600px)": {
   fontSize: "15px", 
 },
 "@media (min-width:960px)": {
   fontSize: "20px", 
 },

      }}>All Parks </Typography>
      <Typography variant="body1"
      style={{ 
        fontWeight: "bold" ,
       }}
        sx={{
 fontSize: "15px", 
 "@media (min-width:600px)": {
   fontSize: "15px", 
 },
 "@media (min-width:960px)": {
   fontSize: "20px", 
 },}}> ({filteredData.length})</Typography>
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
      <TextField
         label="Search"
         variant="outlined"
         size="small"
         value={ search}
         onChange={async(e) => {console.log(e);
          setSearch(e.target.value);
         }}
         sx={{ minWidth: "170px" ,width:"30%", marginLeft:"3%" }}
                />
                  {!isMobileView && (
    <Box
    sx={{
      display: "flex",
    }}
    >
        {["All", "Free", "Reserved"].map((filter) => (
        <FilterButtonItem
          label={filter}
          selectedFilter={selectedFilter}
          onSelect={()=> handleClose(filter)}
        />
      ))}
    </Box>
  
  )}
     {isMobileView && (
    <Box>
      <IconButton
        onClick={handleClick}
      >
        <FilterListIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(selectedFilter)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {["All", "Free", "Reserved"].map((filter) => (
        <FilterMenuItem
          label={filter}
          selectedFilter={selectedFilter}
          onSelect={()=> handleClose(filter)}
        />
      ))}
      </Menu>
    </Box>
  
  )}
    </Box>
    </>
  );
};

export default Title;
