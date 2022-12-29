import { Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function FullName(props){
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");

    const validateFullName = () => {
        if((fname.length > 0) && (lname.length > 0)){
            props.setFullNameValid(true);
        } else {
            props.setFullNameValid(false);
        }
    }

    useEffect(validateFullName, [fname, lname, props]);

    return (
        <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
        <TextField 
            label="FIRST NAME"
            required="true"
            onchange={(e) => setfname(e.target.value)}
        />
        <TextField 
            label="LAST NAME"
            required="true"
            onchange={(e) => setlname(e.target.value)}
        />
        </Stack>
        // <div>
        // <label>FIRST NAME:
        //     <input 
        //       type="text"
        //       className="fname"
        //       onChange={(e) => setfname(e.target.value)}
        //       />
        // </label>
        // <label>LAST NAME:
        //     <input 
        //       type="text"
        //       className="lname"
        //       onChange={(e) => setlname(e.target.value)}
        //       />
        // </label>
        // </div>
    )
}