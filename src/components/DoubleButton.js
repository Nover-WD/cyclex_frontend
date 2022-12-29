import React from "react";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function DoubleButton(){
    return (
        <Stack 
           direction={{sm:"row", xs:"column" }} 
           spacing={{sm: 8, xs: 2}} 
           alignItems="center"
           justifyContent="center"
           position="relative"
           bottom={{sm:"105px", xs:"140px"}}
           >
            <Link to="/shop">
                <Button variant="contained" color="primary" href="" size="large" sx={{borderRadius: "99px", padding: "5px 60px"}}>
                    Shop
                </Button>
            </Link>
            <Link to="cart">
                <Button variant="contained" color="secondary" href="" size="large" sx={{borderRadius: "99px", padding: "5px 60px"}}>
                    Cart
                </Button>
            </Link>
        </Stack>
    )
}