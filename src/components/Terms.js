import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Terms(props){
  const [checked, setChecked] = useState(false);
    useEffect(() => {
      if (checked === true){
      props.setTermsValid(true);
    } else {
      props.setTermsValid(false);
    }
    })

    const Terms = `I AGREE TO TERMS AND CONDITIONS`;
    return(
      <FormControlLabel control={<Checkbox sx={{padding: "0px"}}/>} label={Terms} onClick={(e) => setChecked(!checked)}/>
    )
}