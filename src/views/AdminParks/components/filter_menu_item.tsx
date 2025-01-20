import { MenuItem } from "@mui/material";

type FilterMenuProps ={
    label: string; 
  selectedFilter: string; 
  onSelect: (filter: string) => void; 
  }

  const FilterMenuItem: React.FC<FilterMenuProps> = ({
    label,
    selectedFilter,
    onSelect,
  }) => {
    return (
      <MenuItem
        onClick={() => onSelect(label)}
        sx={{
          backgroundColor: selectedFilter === label ? "#325677" : "inherit",
          color: selectedFilter === label ? "white" : "inherit",
          ":hover": {
            backgroundColor: selectedFilter === label ? "#325677" : "gray",
          },
        }}
      >
        {label}
      </MenuItem>
    );
  };
  
  export default FilterMenuItem;
