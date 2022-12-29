import { TextField } from "@mui/material";
import React from "react";

export default function Email(props) {
    const validateEmail = (email) => {
        if (email.length > 0){
            props.setEmailValid(true);
        } else {
            props.setEmailValid(false);
        }
    }

    return (
        <>
            <TextField
                fullWidth="true"
                label="EMAIL" 
                id="email" 
                required="true" 
                variant="outlined" 
                onChange={(e) => validateEmail(e.target.value)}
                />
        </>
    )
}