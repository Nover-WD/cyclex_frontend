import React from "react";
import TopBanner from "../TopBanner";
import Trending from "../layout/Trending";
import PrimaryMenu from "../PrimaryMenu";
import Footer from "../Footer";

export default function Shop(){
    return(
        <>
        <TopBanner/>
        <PrimaryMenu/>
        <Trending title="Shop"/>
        <Footer/>
        </>
    )
}