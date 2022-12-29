import React from "react";
import HeaderHero from "../HeaderHero";
import Trending from "../layout/Trending";
import PrimaryMenu from "../PrimaryMenu";
import TopBanner from "../TopBanner";
import Footer from "../Footer";

export default function Landing(){
    return(
        <>
        <TopBanner/>
        <PrimaryMenu/>
        <HeaderHero/>
        <Trending title="Products"/>
        <Footer/>
        </>
    )
}