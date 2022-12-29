import React from "react";
import {LinearProgress, Box, Typography } from "@mui/material";
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


const Loader = ({form}) => {
    const classes = useStyles();
    return (
        <Box className={form ? classes.form : classes.root}>
            <LinearProgress/>
            <Typography className={classes.label}>Loading</Typography>
        </Box>
    )
}

export default Loader;