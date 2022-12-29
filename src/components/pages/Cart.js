import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Box, Stack, IconButton, TextField, Paper, Button } from "@mui/material";
import { Remove, Add, Delete } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";

//files
import { addToCart, removeFromCart, requestCartItems } from "../../actions/cartActions";
import Message from "../Message";
import { Typography } from "@mui/material";
import BackButton from "../BackButton";
import TopBanner from "../TopBanner";
import PrimaryMenu from "../PrimaryMenu";
import Footer from "../Footer";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '60px 60px',
        '@media (max-width: 600px)': {
            padding: '30px 30px'
        }
    },
    section: {
        display: "flex",
        flexWrap: "wrap"
    },
    cartContainer: {
        padding: "20px",
        margin: "20px 0"
    },
    itemDetails: {
        padding: "0 10px",
        [theme.breakpoints.down("sm")]: {
        }
    },
    checkOutContainer: {
        padding: "20px"
    },
    column: {
        [theme.breakpoints.down("md")]: {
            width: '100%',
            margin: '10px 0',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            '& img': {
                width: '100%',
                height: 'auto'
            },
            '& div': {
                width: '100%',
                margin: '10px 0px'
            }
        },
        [theme.breakpoints.down('sm')]: {
        }
    }
}));

const Cart = () => {
    const classes = useStyles();
    const params = useParams();
    const history = useNavigate();
    const location = useLocation(); 
    const itemId = params.id; //check this
    const qty = location.search ? Number(location.search.split("=")[1]) : 1; //quantity from the url parameter
    const dispatch = useDispatch();

    //get in the store
    const cart = useSelector((state) => state.cart); 
    const { cartItems } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(!userInfo){
            history("/signin");
        } else if (itemId) {
            dispatch(addToCart(itemId, qty, userInfo._id));
        }
        
        if(userInfo){
            dispatch(requestCartItems(userInfo._id));
        }
    }, [dispatch, itemId, qty, userInfo, history]);

    return (
        <>
        <TopBanner/>
        <PrimaryMenu/>
        <Box className="boxed">
            {cartItems.length === 0 ? (
                <Box>
                < BackButton />
                <Message>Hurray your cart is clear!</Message> 
                </Box>
            ): (
            <Box>
                <BackButton/>
                <Box >
                <Typography variant="h2" sx={{ padding: "30px 0 0 30px" }}>
                    Cart
                </Typography>
                </Box>
                <Box className={classes.root}>
                    {cartItems.map((item) => (
                        <Paper  key={item._id} className={classes.cartContainer}>
                                <Box className={classes.section}>
                                <Box sx={{ display:"flex", width: "50%"}} className={classes.column}>
                                    <img src={item.image} alt={item.name} title={item.name} width="150px" height="99px"/>
                                    <Box className={classes.itemDetails}>
                                        <Typography variant="h4">
                                            {item.name}
                                        </Typography>
                                        <Typography>
                                            by <b>{item.brand}</b>
                                        </Typography>
                                        <Typography color="primary.main">
                                            ${item.price}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Stack className={classes.column} direction={{xs:"column", sm:"row"}} sx={{width: "50%"}} justifyContent="space-around">
                                    {/* Quantity Bar */}
                                    <Stack 
                                    direction={{xs:"column"}}
                                    spacing={{xs: 2, sm: 4}}
                                    >
                                        <Typography variant="h5">Quantity:</Typography>
                                        <Stack direction={{xs:"row"}}>
                                            <IconButton 
                                            color="secondary"
                                            size="small"
                                            onClick={() => dispatch(addToCart(item.item, --item.qty, item.user))}
                                            disabled={item.qty === 1}
                                            >
                                                <Remove/>
                                            </IconButton>
                                            <TextField 
                                            id="" 
                                            label="" 
                                            variant="outlined" 
                                            value={item.qty}
                                            size="small"
                                            color='secondary'
                                            type="number"
                                            sx={{width: "100px"}}
                                            />
                                            <IconButton
                                            color="secondary"
                                            size="small"
                                            onClick={() => dispatch(addToCart(item.item, ++item.qty, item.user))}
                                            disabled={item.qty === item.countInStock}
                                            >
                                                <Add/>
                                            </IconButton>
                                        </Stack>
                                    </Stack>
                                    <Button style={{color: red[900], height: "50px", margin: "auto 0"}} startIcon={<Delete/>} onClick={() => dispatch(removeFromCart(item._id))}>
                                        <Typography>
                                            REMOVE FROM CART
                                        </Typography>
                                    </Button>
                                </Stack>
                            </Box>
                        </Paper>
                ))}
                <Stack direction={{xs:"column"}} justifyContent="flex-end" alignItems="flex-end">
                    <Paper className={classes.checkOutContainer}>
                        <Typography>
                            {/* reference: https://www.w3schools.com/jsref/jsref_reduce.asp */}
                            Total: {" "}
                            <Typography variant="span" color="primary.main">
                            ${cartItems
                            .reduce((initialValue, item) => initialValue + item.price * item.qty, 0)
                            .toFixed(2)}
                            </Typography>
                        </Typography>
                        <Typography>
                            Qty: {" "}
                            {cartItems
                            .reduce((initialValue, item) => initialValue + item.qty, 0
                            )} items
                        </Typography>
                        <Link to="/checkout">
                            <Button variant="contained" color="success" sx={{margin: "10px 0 0 0"}}>
                                CHECKOUT
                            </Button>
                        </Link>
                    </Paper>
                </Stack>
                </Box>
            </Box>
            )}
        </Box>
        <Footer/>
        </>
    );
} 

export default Cart;

