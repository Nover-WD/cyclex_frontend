import React from "react";
import { Box } from "@mui/material";

//components
import Loader from "./Loader";
import Message from "./Message";


const Form = ({isLoading, error, children, success}) => {
    return (
        <Box>
            {isLoading ? ( 
                    <Loader form={true}/> 
                    ) : (
                    <Box>
                        { error && ( <Message form={true} severity="error">{error}</Message> ) }
                        { success && (<Message form={true} severity="success">{success}</Message>)}
                    </Box>
            )}
            {children}
        </Box>
    )
}

export default Form;