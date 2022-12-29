import React from "react";
import ForgotForm from "../forms/ForgotForm";
import { Box, Paper } from "@mui/material";
import TopBanner from "../TopBanner";
import PrimaryMenu from "../PrimaryMenu";
import Footer from "../Footer";

export default function Forgot(){
    return (
        <div>
        <TopBanner/>
        <PrimaryMenu/>
        <Box sx={{padding: "60px", '@media (max-width: 600px)': {padding:'30px'}}} id="forgot">
            <Paper 
                elevation={4} 
                sx={{width: "480px", 
                padding: "40px 30px", 
                backgroundColor: "primary.light",
                margin: "auto",
                '@media (max-width: 600px)': {
                    width: '100%'
                }
                }}>
                <ForgotForm/>
            </Paper>
        </Box>
        <Footer/>
        </div>
    )
}