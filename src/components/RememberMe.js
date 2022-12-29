import React, { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function RememberMe(){
    const [checked, setChecked] = useState(false);

    return(
        <>
        <FormControlLabel 
            label="REMEMBER ME" 
            control={<Checkbox sx={{padding: "0px"}}/>}
            value={checked}
            onChange={(e) => {setChecked(!checked)}}
            />
        </>
    )
}