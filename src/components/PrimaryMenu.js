import React, { useEffect } from "react";
import { AppBar,  Toolbar, Button, Menu, MenuItem, Stack, Box, Badge, Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { makeStyles } from "@mui/styles";
import {Link} from "react-router-dom";

//react-redux
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { removeCartItems, requestCartItems } from "../actions/cartActions";
import { relative } from "path";

const useStyles = makeStyles(() => ({
  toolbar: {
    justifyContent: 'space-around',
    '@media (max-width: 600px)': {
      flexDirection: "column"
    }
  },
  textDecorationNone: {
    textDecoration: 'none'
  },
  blackColor: {
    color: '#222'
  }
}))

export default function PrimaryMenu(){
    const [menu, setMenu] = React.useState(null);
    
    const handleClick = (e) => {
      setMenu(e.currentTarget);
    }

    const handleClose = () => {
      setMenu(null);
    }

    const classes = useStyles();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();


    const handleLogout = () => {
      dispatch(removeCartItems());
      dispatch(logout());
    };

    useEffect(() => {
      if(userInfo) {
        dispatch(requestCartItems(userInfo._id));
      }
    }, [userInfo, dispatch]);

    return(
          <AppBar className="boxed"  sx={{padding: "10px 0px", boxShadow:"none", zIndex: "1", position: "relative", '@media(max-width: 600px)': {padding: "0px"}}} color="transparent">
              <Toolbar className={classes.toolbar}>
                  <Box>
                  <Link to="/">
                  <img style={{width: "200px"}} src="/assets/img/CycleX-Logo.png" alt="CycleX Logo" title="CycleX - Home"/>
                  </Link>
                  </Box>
                  <Stack direction="row" className="cus-navBar" spacing={{xs: 8, sm: 3 }}>
                    <Button
                    id="basic-button"
                    onClick={handleClick}
                    >
                      <AccountCircleIcon fontSize="large"/>
                      { userInfo ? ( <Typography>Welcome, {userInfo.name}</Typography> ) : <Typography>Account</Typography> }
                    </Button>
                    <Menu
                    anchorEl={menu}
                    id="account-menu"
                    open={Boolean(menu)}
                    onClose={handleClose}
                    sx={{textTransform: "uppercase"}}
                        >
                      <MenuItem onClick={handleClose}>
                        { userInfo ? (
                          <Link to="/profile">View Profile</Link>
                        ) : (
                          <Link to="/signin">Sign in</Link>
                        )}
                      </MenuItem> 
                      <MenuItem onClick={handleClose}>
                        { userInfo ? userInfo.isAdmin ? (
                          <Link to="/cyclex-admin">Admin</Link> ) : null
                        : null }
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        { userInfo ? (
                          <Link to="#" onClick={handleLogout}>Logout</Link>
                        ) : (
                          <Link to="/signup">Sign up</Link>
                        )}
                      </MenuItem> 
                   </Menu>
                   <Link to="/shop" title="Go to Shop">
                      <Button>
                        <StoreIcon fontSize="large" color="primary"/>
                      </Button>
                   </Link>
                   <Link to="/cart" title="See your Cart">
                    <Button>
                        <Badge color="secondary" badgeContent={cartItems.reduce((initialValue, item) => item._id ? 1 + initialValue : initialValue, 0)}>
                          <ShoppingCartIcon fontSize="large" color="primary"/>
                        </Badge>
                    </Button>
                    </Link>
                </Stack>
              </Toolbar>
         </AppBar>
    )
}