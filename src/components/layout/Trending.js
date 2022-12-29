import React, { useEffect } from "react";
import { Box, Typography, Grid, Paper } from"@mui/material";
import { styled, makeStyles } from "@mui/styles";
import Star from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";
import Message from "../Message";
import Loader from "../Loader";
import { listItems } from "../../actions/itemActions.js";

const Item = styled(Paper) ({
    '&:hover': {
        border: '1px solid #0461b1',
    }
})


const useStyles = makeStyles({
    root: {
        padding: '60px 60px',
        '@media (max-width: 600px)': {
            padding: '30px 30px'
        }
    },
    gridContainer: {
        padding: '30px 0px'
    },
    prodDetails: {
        padding: '10px 40px 20px 40px'
    },
    prodPrice: {
        padding: '20px 0px'
    },
    prodRatings: {
        color: '#FDC208'
    },
    prodBrand: {
        fontWeight: '400'
    },
    noneTextDecoration: {
        textDecoration: "none"
    }
})

export default function Trending({title}){
    const classes = useStyles();
    const dispatch = useDispatch();
    const itemList = useSelector((state) => state.itemList);
    const { isLoading, error, items } = itemList;

    //get the data from store
    useEffect(() => {
        dispatch(listItems());
    }, [dispatch]);

    
    return(
        <Box className="boxed" id="top-products">
            {isLoading ? (
                <Loader />
            ): error ? (
                <Message severity="error">{error}</Message>
            ): (
                <Box className={classes.root}>
                    <Typography variant="h3">
                        {title}
                    </Typography>
                    <Grid container spacing={4} className={classes.gridContainer}> 
                    {items.map((item) => (
                        <Grid item xs={12} sm={6} md={4} xl={3}  key={item._id}>
                            <Link to={"/item/" + item._id} className={classes.noneTextDecoration}>
                            <Item id="product-item">
                                <img src={item.image} alt={item.name} title={item.name} width="100%"/>
                                <Box className={classes.prodDetails}>
                                <Typography variant="h4">{item.name}</Typography>
                                <Typography variant="h6" className={classes.prodBrand}>by <strong>{item.brand}</strong></Typography>
                                <Typography variant="h5" className={classes.prodPrice} color='primary.main'>${item.price}</Typography>
                                <Typography variant="h6" className={classes.prodRatings}>
                                    {item.numReviews > 0 ? (
                                    <>
                                    Rating: {item.rating}
                                    <Star/>
                                    </>
                                    ) : (
                                        "No Rating yet"
                                    )}
                                </Typography>
                                <Typography variant="h6" fontWeight='400'>
                                    ({item.numReviews} Reviews)
                                </Typography>
                                </Box>
                            </Item>
                            </Link>
                        </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    )
}