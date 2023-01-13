import React from "react";
import SignInForm from "../forms/SignInForm";
import { Box, Paper, Typography, Grid} from "@mui/material";
import TopBanner from "../TopBanner";
import PrimaryMenu from "../PrimaryMenu";
import Footer from "../Footer";

export default function Login(){
    return(
        <>
            <TopBanner/>
            <PrimaryMenu/>
            <Box sx={{padding: "60px", '@media (max-width: 600px)': {padding: '30px'}}} id="signback">
                <Paper 
                elevation={4} 
                sx={{width: "480px", 
                padding: "40px 30px", 
                backgroundColor: "primary.light",
                margin: "auto",
                '@media (max-width: 600px)': {
                    width: '100%'
                }
                }}
                >
                    <SignInForm/>
                </Paper>
            </Box>
            {/* <Grid container  sx={{ '@media (min-width: 900px)': {width: "920px"},  margin: "auto", padding: "60px", '@media (max-width: 600px)': {padding: '30px'}}}>
                <Grid item md={8} xs={12}>
                    <Paper elevation={4} sx={{ padding: "40px 30px", margin: "auto", '@media (max-width: 600px)': {width: '100%'}}}>
                        <SignInForm/>
                    </Paper>
                </Grid>
                <Grid md={4} xs={12}>
                    <Paper elevation={4} sx={{ padding: "40px 30px", margin: "auto"}}>
                        <Typography>
                            Hello
                        </Typography>
                    </Paper>
                </Grid>
            </Grid> */}
            <Footer/>
        </>
    )
}