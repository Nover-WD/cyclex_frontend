import React from "react";
import {CircularProgress, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles"; 

const useStyles = makeStyles({
    root: {
        width: '50%',
        margin: "auto",
        padding: "150px 0"
    },
    form: {
        padding: "20px 0"
    },
    label: {
        textAlign: "center"
    }

})


const AdminLoader = ({form, loaderMessage}) => {
    const classes = useStyles();
    return (
        <Box className={form ? classes.form : classes.root}>
            <CircularProgress sx={{margin: "auto", display: "block"}}/>
            <Typography className={classes.label}>{loaderMessage ? loaderMessage : "Loading"}</Typography>
        </Box>
    )
}

export default AdminLoader;