import React from "react";
import SignInForm from "../forms/SignInForm";
import { Box, Paper, Typography} from "@mui/material";
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
                <Paper>
                    <Typography>
                        Helo
                    </Typography>
                </Paper>
            </Box>
            <Footer/>
        </>
    )
}