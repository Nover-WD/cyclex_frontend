import React from "react";
import { Button } from "@mui/material";

export default function FormButton(props){
    return (
        <div style={{padding: "20px 0px"}}>
                <Button variant="contained" type="submit">
                {props.name}
                </Button>
        </div>
        // <div>
        // <button disabled={!props.isEnabled}>{props.name}</button>
        // </div>
    )
}