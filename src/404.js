import { Typography, Box } from '@mui/material';
import React from 'react';

function NoPage(){
    return(
        <Box style={{padding: '60px 0px', textAlign: 'center'}}>
            <Typography variant="h1" color='primary'>
                404 PAGE NOT FOUND
            </Typography>
            <Typography>
                Go to <a href="/">Homepage</a>
            </Typography>
        </Box>
    )
}

export default NoPage;