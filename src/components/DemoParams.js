import React from "react";
import {useParams} from "react-router-dom";

function DemoParams(){
    const params = useParams();
    
    return(
        <>
        <h1>Params: {JSON.stringify(params)} </h1>
        </>
    )
}

export default DemoParams;