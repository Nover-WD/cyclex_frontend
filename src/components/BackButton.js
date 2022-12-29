import React from "react";
import { IconButton, Box } from "@mui/material";
import { ArrowCircleLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const BackButton = () => {
    const history = useNavigate();

    const goBack = () => {
        history(-1);
    }

    return (
        <Box>
            <IconButton
            onClick={goBack}
            color="primary"
            sx={{ padding: "0 30px" }}
            >
                <ArrowCircleLeft fontSize="large"/>
                BACK
            </IconButton>
        </Box>
    )
}

export default BackButton;