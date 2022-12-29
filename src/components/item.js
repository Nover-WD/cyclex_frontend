import { makeStyles } from '@mui/styles';
import { Grid, Typography, Box, Rating, Button, Stack, IconButton, TextField} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

//redux
import { useDispatch, useSelector } from 'react-redux';
import { listItemDetail } from '../actions/itemActions';
import Loader from "../components/Loader";
import Message from "../components/Loader";
import BackButton from './BackButton';

//files
import TopBanner from './TopBanner';
import PrimaryMenu from './PrimaryMenu';
import Footer from './Footer';


const useStyles = makeStyles(() => ({
    root: {
        padding: '60px 60px',
        '@media (max-width: 600px)': {
            padding: '30px 30px'
        }
    }, 
    prodDetails: {
        padding: '30px 0px',
        '@media (min-width: 900px)': {
            padding: '0px 30px'
        }
    },
    prodBrand: {
        fontWeight: '400'
    },
    prodPrice: {
        margin: '20px 0px',
    },
    hidden: {
        display: 'none'
    },
    presalePrice: {
        textDecoration: 'line-through',
        color: '#aaaaaf'
    },
    itemOut: {
        color: 'red'
    },
    itemLimited: {
        color: 'orange'
    }
}))

const Item = () => {
    const [quantity, setQuantity] = useState(1);

    const classes = useStyles();

    //change location
    const history = useNavigate();

    //get the url path endpoint
    const params = useParams();

    //start the state
    const dispatch = useDispatch(); 
    //request the state/data. the state.itemDetail is on the store
    const itemDetail = useSelector((state) => state.itemDetail); //state.itemDetail is get from store
    //destruct/breakdown the itemDetail
    const { isLoading, item, error } = itemDetail; //isLoading, item, error get from itemReducer

    const itemId = params.id;

    useEffect(() => {
        dispatch(listItemDetail(itemId)); //get the id in item api and pass it to listItemDetail param
    }, [dispatch]);

    //redirect to this url
    //right
    const handleAddCart = () => {
        history(`/cart/${params.id}?qty=${quantity}`); //check the params id
    }


    return(
        <>
        <TopBanner/>
        <PrimaryMenu/>
        <Box className="boxed">
        { isLoading ? (
            <Loader/>
        ): error ? (
            <Box>
            < BackButton />
            <Message severity="error">{error}</Message> 
            </Box>
        )
            : (
            <Box>
            < BackButton />
            <Grid container className={classes.root} key={item.id}>
                <Grid item xs={12} md={6}>
                    <Box>
                        <img width='100%' height='100%' src={item.image} alt={item.name} title={item.name}/>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} className={classes.prodDetails}>
                    <Box>
                        {/* Item Info */}
                        <Typography variant='h2'>
                            {item.name}
                        </Typography>
                        <Typography>
                            by <strong>{item.brand}</strong>
                        </Typography>
                        <Typography>
                            {item.description}
                        </Typography>
                        <hr/>

                        {/* Item Ratings and others */}
                        <Typography>
                        {item.numReviews > 0 ? (<><u color="#f7f704">{item.rating}</u> <Rating value={item.rating} readOnly precision={0.5} name="item-rating" aria-label='item rating'/></>) : (
                        "No Ratings yet"
                        )} |  <u>{item.numReviews}</u> Ratings | <u>{item.sold}</u> Sold
                        </Typography>

                        {/* Item Price and Stock Info */}
                        <Box className={classes.prodPrice}>
                        <Typography color='primary.main' variant='h4'>
                            <span 
                            className={item.price >= item.presalePrice ? classes.hidden : classes.presalePrice
                            }
                            >
                                ${item.presalePrice}
                            </span>
                            <span className={item.price >= item.presalePrice? classes.hidden : "false"}>
                                &nbsp;
                            </span>
                            ${item.price}
                        </Typography>
                        <Typography 
                        className={item.countInStock === 0 ? classes.itemOut :
                                    item.countInStock <= item.lowInStock ? classes.itemLimited : "false"}
                        >
                        {item.countInStock === 0 ? 'Out of stock' : 
                        item.countInStock <= item.lowInStock ? "In Stock: " + item.countInStock + " (Few Item Left)" : 
                        'In Stock: ' + item.countInStock}
                        </Typography>
                        </Box>
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
                        <Stack direction={{xs: 'column', sm: 'row'}} spacing={{xs: 2, sm: 4}}>
                        <Button  
                        variant="outlined" 
                        disabled={item.countInStock === 0}
                        onClick={handleAddCart}
                        >
                            Add to Cart
                        </Button>
                        {/* <Button startIcon={<ShoppingCartCheckoutIcon/>} variant="contained">
                            Buy Now
                        </Button> */}
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
            </Box>
            )}
        </Box>
        <Footer/>
        </>
    )
}

export default Item;

//dont know the match in example