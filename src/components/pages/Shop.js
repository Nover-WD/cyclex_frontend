import React from "react";
import TopBanner from "../TopBanner";
import Trending from "../layout/Trending";
import PrimaryMenu from "../PrimaryMenu";
import Footer from "../Footer";

import { styled, makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        '@media (max-width: 599px)': {
            padding: '30px 30px',
            marginTop: '92px'
        }
    }
})

export default function Shop(){
    const classes = useStyles();
    
    return(
        <>
        <TopBanner/>
        <PrimaryMenu/>
        <Trending title="Shop" className={classes.root}/>
        <Footer/>
        </>
    )
}
