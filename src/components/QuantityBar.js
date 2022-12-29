import React from "react";
import { Stack, IconButton, Typography, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";



const QuantityBar = (props) => {
    return (
        <Stack 
        direction={{xs:"column", sm:"row"}}
        spacing={{xs: 2, sm: 4}}
        sx={{margin: "20px 0"}}
        >
            <Typography variant="h5">Quantity:</Typography>
            <IconButton 
            color="secondary"
            size="small"
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity === 1}
            >
                <Remove/>
            </IconButton>
            <TextField 
            id="" 
            label="" 
            variant="outlined" 
            value={quantity}
            size="small"
            color='secondary'
            type="number"
            sx={{width: "100px"}}
            />
            <IconButton
            color="secondary"
            size="small"
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity === item.countInStock}
            >
                <Add/>
            </IconButton>
        </Stack>
    )
}

export default QuantityBar;
