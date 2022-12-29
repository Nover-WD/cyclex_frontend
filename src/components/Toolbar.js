import React from "react";
import { useState } from "react";
import { Typography, Box, Stack, Button, Menu, MenuItem } from "@mui/material";
import { Person, Home } from "@mui/icons-material";
import { Link } from "react-router-dom";

//redux
import { useSelector } from "react-redux";

const Toolbar = () => {
    const [menu, setMenu] = useState(null);

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const handleClick = (event) => {
        setMenu(event.currentTarget);
    }

    const handleClose = (event) => {
        setMenu(false)
    }
    
    return (
        <Box component="div">
            <Stack direction={{xs: "column", sm: "row"}} sx={{padding: "5px 30px", backgroundColor: "#343439"}} justifyContent="space-between">
                <Link to="/">
                    <Button>
                        <Home />
                        <Typography color="white"> Visit Site</Typography>
                    </Button>
                </Link>
                <Button onClick={handleClick}>
                   { userInfo ? (<Typography color="white">{ userInfo.name }</Typography>) : null }
                    <Person/>
                </Button>
                <Menu open={Boolean(menu)} anchorEl={menu} onClick={handleClose}>
                    <MenuItem onClick={handleClose}>Account</MenuItem>
                    <MenuItem onCick={handleClose}>Logout</MenuItem>
                </Menu>
            </Stack>
        </Box>
    )
};

export default Toolbar;