import React from "react";
import RegistrationForm from "../forms/RegistrationForm";
import { Box, Paper } from "@mui/material";
import TopBanner from "../TopBanner";
import PrimaryMenu from "../PrimaryMenu";
import Footer from "../Footer";


export default function Registration(){
    return (
        <>
            <TopBanner/>
            <PrimaryMenu/>
            <Box sx={{padding: "60px", '@media (max-width: 600px)' : {padding: '30px 30px'}}} id="register" >
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
                    <RegistrationForm/>
                </Paper>
            </Box>
            <Footer/>
        </>
    )
}