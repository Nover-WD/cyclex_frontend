import React from "react";
import { ListItem, List,  ListItemText, Typography, Grid} from "@mui/material";
import { Link } from "react-router-dom";
import SocialMedia from "./SocialMedia";

//react-redux
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { removeCartItems } from "../actions/cartActions";

export default function SecondaryMenu(){
    const dispatch = useDispatch();

    const handleLogout = () => {
      dispatch(removeCartItems());
      dispatch(logout());
    };

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    return(
        <Grid container color="secondary.light" rowSpacing={5} className="boxed" sx={{"justify-content": "center"}}>
            <Grid item xs={12} sm={6} md={4} xl={3}>
            <Link to="/" >
            <img style={{width: "200px", backgroundColor: '#fff'}} src="/assets/img/CycleX-Logo.png" alt="CycleX Logo" title="CycleX - Home"/>
            </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
            <List>
            <ListItemText sx={{color: "#000"}}>
                      <Typography variant="h4" >ACCOUNT</Typography>
                </ListItemText>
                <Typography>
                <ListItem>
                <Link to="/cart">
                    Cart
                    </Link>
                </ListItem>
                <ListItem>
                    { userInfo ? (
                        <Link to="/profile">View Profile</Link>
                    ) : (
                        <Link to="/signin">Sign in</Link>
                    )}
                </ListItem>
                <ListItem>
                    { userInfo ? (
                        <Link to="#" onClick={handleLogout}>Logout</Link>
                    ) : (
                        <Link to="/signup">Sign up</Link>
                    )}
                </ListItem>
                </Typography>
            </List>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}>
            <List>
            <ListItemText sx={{color: "#000"}}>
                      <Typography variant="h4" >NAVIGATE</Typography>
                </ListItemText>
                <Typography>
                <ListItem>
                    <Link to="/shop" title="Go to Shop">
                        Shop
                    </Link>
                </ListItem>
                </Typography>
            </List>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4} xl={3}>
                <SocialMedia/>
            </Grid> */}
        </Grid>
    )
}