import {
    CardContent, Skeleton,Card
  } from "@mui/material";

  const ShimmerListTile = () => {
  
    return (
        <Card  sx={{
            display: "flex",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            height:'70%',
            alignItems: "center",
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: "white",
          }}>
            <Skeleton variant="rectangular" height={150} width='30%' />
            <CardContent>
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="80%" />
            </CardContent>
          </Card>
  );
};

export default ShimmerListTile;
