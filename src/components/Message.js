import { Alert } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root : {
        width: "50%",
        margin: "150px auto"
    },
    form: {
        margin: "20px 0"
    }
})

const Message = ({severity, form, children}) => {
    const classes = useStyles();

    return (
        <Box>
            <Alert severity={severity} className={form ? classes.form : classes.root}>
                {children}
            </Alert>
        </Box>
    )
};

export default Message;