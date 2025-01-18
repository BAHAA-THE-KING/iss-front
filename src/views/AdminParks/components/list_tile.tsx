import React, { useState } from "react";
import {
    Box,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
  } from "@mui/material";
  import MoreVertIcon from "@mui/icons-material/MoreVert";
  import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import parkImage from "src/assets/park.jpg";


interface ListTileProps {
    title: string; 
    subtitle: string; 
    trailing: string;
    onDelete: () => void;
    onEdit: () => void;

  }

  const ListTile: React.FC<ListTileProps> = ({  title, subtitle, trailing , onDelete ,onEdit }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const handleDelete = () => {
      onDelete();
      handleMenuClose();
    };

   const handleEdit = () => {
      console.log('hello');
      onEdit();
      handleMenuClose();
    };
  
  
    return (
    <Box
      sx={{
        display: "flex",
        // width:'50%',
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        height:'70%',
        alignItems: "center",
        padding: "16px",
        border: "3px solid wheat",
        borderRadius: "8px",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width:"20%",
          borderRadius: "50%",
          marginRight: "16px",
          objectFit: "cover",
        }}
      >
        <img
        src={parkImage}
        style={{
          height: "100%",
          width:"100%",
          objectFit: "cover",
          borderRadius:"15px"
        }}
      />
        </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body2">{trailing}</Typography>
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleDelete} sx={{textDecorationColor:"red"}}>
            <ListItemIcon>
              <DeleteIcon sx={{ color: "red" }} />
            </ListItemIcon>
            Delete
          </MenuItem>
          <MenuItem onClick={handleEdit} sx={{textDecorationColor:"gold"}}>
            <ListItemIcon>
              <EditIcon sx={{ color: "gold" }} />
            </ListItemIcon>
            Edit
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default ListTile;
