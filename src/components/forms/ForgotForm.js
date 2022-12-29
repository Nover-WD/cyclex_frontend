import React, { useEffect, useState } from "react";
import {  Typography, Box, TextField, Button } from "@mui/material";

//redux
import { useDispatch, useSelector } from "react-redux";
import { userForgotPassword } from "../../actions/userActions";

//react-router
import { Link, useNavigate } from "react-router-dom";
import Form from "../Form";

export default function ForgotForm(){
    const history = useNavigate();
    const [email, setEmail] = useState(null);

    const dispatch = useDispatch();
    const forgotPassword = useSelector((state) => state.forgotPassword);
    const { error, sentResetLink, isLoading } = forgotPassword;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(userForgotPassword(email));
    };

    useEffect(() => {
        if(userInfo){
            history("/");
        }
    }, [userInfo]);
    
    return(
        <>
           <Form error={error} isLoading={isLoading} form={true} success={sentResetLink}>
           </Form>
            <Link to="/">
                <img src="/assets/img/CycleX-Logo.png" width="150px" style={{margin: "auto", display:"block"}} alt="CycleX Logo" title="CycleX - Home"/>
            </Link>        
            <Typography variant="h3" textAlign="center" sx={{padding: "30px 0px"}}>
            RESET PASSWORD
            </Typography>
            <Box component="form" noValidate autocomplete="off" onSubmit={(event) => handleSubmit(event)}>
                <TextField sx={{paddingBottom: "20px"}} label="EMAIL" type="email" variant="outlined" fullWidth required 
                onChange={(event) => setEmail(event.target.value)}/>
                <Button type="submit" variant="contained">
                    RESET PASSWORD
                </Button>
            </Box>
        </>
    )
}