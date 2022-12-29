import { Typography, Stack } from "@mui/material";
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import React from "react";

export default function SocialMedia(){
    return(
        <Stack direction={{xs: 'column', sm: 'row'}} spacing={4} sx={{py: "20px"}}>
        <Typography variant="h4" color='#000'>
            Follow us:
        </Typography>
            <Stack direction='row' spacing={3}>
            <FacebookIcon sx={{color: 'secondary.light'}} fontSize="large"/>
            <YouTubeIcon sx={{color: 'secondary.light'}} fontSize="large"/>
            <PinterestIcon sx={{color: 'secondary.light'}} fontSize="large"/>
            </Stack>
        </Stack>
    )
}