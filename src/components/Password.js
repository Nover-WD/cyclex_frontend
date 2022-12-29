import React from "react";
import {TextField} from "@mui/material";

export default function Password(props){
    const validatePassword = (pass) => {
        if(pass.length >= 6 ){
            props.setPasswordValid(true);
        } else {
            props.setPasswordValid(false);
        }
    }

    return (
        <>
        <TextField
            label="PASSWORD"
            required="true"
            type="password"
            onChange={(e) => validatePassword(e.target.value)}
            />
        </>
        // <div>
        // <label>PASSWORD:
        //     <input 
        //       type="password" 
        //       className="password"
        //       onChange={(e) => validatePassword(e.target.value)}
        //       />
        // </label>
        // </div>
    )
}