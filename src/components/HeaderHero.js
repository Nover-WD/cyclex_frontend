import React from "react";
import DoubleButton from "./DoubleButton";
import {Box} from '@mui/material';

export default function HeaderHero(){
    return(
        // <Box sx={{
        //     backgroundImage: "url(/assets/img/road-bike.png)", 
        //     backgroundRepeat: "no-repeat",
        //     height: "580px",
        //     backgroundSize: "100% 100%",
        //     marginTop: '-100px',
        //     '@media (max-width: 600px)': {
        //         marginTop: '-145px',
        //         height: '480px'
        //     } 
        //     }}>
        //     <DoubleButton/>
        // </Box>
        <div>
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="/assets/img/road-bike.png" class="d-block vh-80" alt="Black Road Bike"/>
                </div>
                <div class="carousel-item">
                    <img src="/assets/img/mountain-bike2.png" class="d-block vh-80" alt="Extreme Mountain Bike"/>
                </div>
                <div class="carousel-item">
                    <img src="/assets/img/helmets.png" class="d-block vh-80" alt="Customized Helmets"/>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <DoubleButton/>
        </div>
    )
}