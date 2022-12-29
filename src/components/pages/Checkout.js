import React from "react";
import { Box, Typography} from "@mui/material";
import TopBanner from "../TopBanner";
import PrimaryMenu from "../PrimaryMenu";
import Footer from "../Footer";

//redux
import BackButton from '../BackButton';


export default function About(){
    return(
        <>
        <TopBanner/>
        <PrimaryMenu/>
        <Box class="boxed">
            <BackButton/>
            <Typography variant="h4"  textAlign="center" sx={{padding: "50px 0px"}}>
                Checkout is not available.
            </Typography>
        </Box>
        <Footer/>
        </>
    )
}