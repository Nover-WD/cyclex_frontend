import { Box, Typography } from "@mui/material";
import React from "react";
import SecondaryMenu from "./SecondaryMenu";

export default function Footer(){
    return(
        <Box sx={{padding: "60px 60px 30px", '@media (max-width: 600px)': {padding: '60px 30px'}, backgroundColor: "primary.main"}}>
            <SecondaryMenu/>
            <Typography variant="h6" textAlign="center" sx={{fontWeight: "400", pt: "40px"}}>
                Copyright ©2023 CycleX | For Portfolio by Nover Garin
            </Typography>
        </Box>
    )
}