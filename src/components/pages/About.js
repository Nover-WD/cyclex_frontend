import React from "react";
import { Grid, Typography } from "@mui/material";
import TopBanner from "../TopBanner";
import PrimaryMenu from "../PrimaryMenu";
import Footer from "../Footer";


export default function About(){
    return(
        <>
        <TopBanner/>
        <PrimaryMenu/>
        <Grid container>
            <Grid item xs={12} md={6}>
                <Typography>Nover Garin</Typography>
                <Typography>Full Stack Web Developer</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <img />
            </Grid>
        </Grid>
        <Footer/>
        </>
    )
}