import { TextField } from "@mui/material";
import React from "react";

export default function ConfirmPassword(props){
    const validateConfirmPassword = (confirmPass) => {
        if (confirmPass.length > 0){
            props.setConfirmPasswordValid(true);
        } else {
            props.setConfirmPasswordValid(false);
        }
    }

    return (
        <>
        <TextField 
            label="CONFIRM PASSWORD" 
            required="true" 
            type="password"
            onChange={(e) => validateConfirmPassword(e.target.value)}
            />
        </>
        // <div>
        // <label>CONFIRM PASSWORD:
        //     <input 
        //       type="password"
        //       className="confirm-pass"
        //       onChange={(e) => validateConfirmPassword(e.target.value)}
        //       />
        // </label>
        // </div>
    )
}