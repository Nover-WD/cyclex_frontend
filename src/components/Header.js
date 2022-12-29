import React from "react";
import TopBanner from "./TopBanner";
import Box from "@mui/material/Box";
import HeaderHero from "./HeaderHero";

export default function Header(){
    return(
        <Box>
            <TopBanner/>
            <HeaderHero/>
        </Box>
    )
}