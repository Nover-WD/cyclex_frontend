import React from "react";
import Box from "@mui/material/Box"
import { Typography } from "@mui/material";

export default function TopBanner(){
    return(
        <Box sx={{textAlign:'center'}}>
            <Typography variant="h5" sx={{fontWeight: "400", padding: "10px 10px", backgroundColor: "secondary.light"}}>
              Get 50% on selected items for your first purchase!
            </Typography>
        </Box>
    )
}