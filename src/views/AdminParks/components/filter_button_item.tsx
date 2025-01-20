import { motion } from "framer-motion";

type FilterMenuProps ={
    label: string; 
  selectedFilter: string; 
  onSelect: (filter: string) => void; 
  }

  const FilterButtonItem: React.FC<FilterMenuProps> = ({
    label,
    selectedFilter,
    onSelect,
  }) => {
    return (
      <motion.button
        onClick={() => onSelect(label)}
        whileHover={{
          scale: 1.1,
          backgroundColor: "gray",
          color: "black",
        }}
        transition={{
          bounceDamping: 10,
          bounceStiffness: 600,
        }}
        style={{
          marginInline:"5px",
          border: "none",
          padding:"10px",
          paddingInline:"30px",
          borderRadius:"20px",
          backgroundColor: selectedFilter === label ? "#325677" : "inherit",
          color: selectedFilter === label ? "white" : "inherit",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
        }}
      >
        {label}
      </motion.button>
    );
  };
  
  export default FilterButtonItem;
