import React, { useEffect, useState } from "react";
import { Typography, Stack, TextField, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

//router-dom
import {Link, useNavigate, useLocation} from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../../src/actions/userActions";

//components
import Message from "../Message";
import Form from "../Form";

const useStyles = makeStyles((theme) => ({
    noneTextDecoration: {
        color: theme.palette.secondary.light,
        textDecoration: "none"
    }
}));

export default function RegistrationForm() {
    const classes = useStyles();
    const history = useNavigate();
    const location = useLocation();

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    let { isLoading, error, userInfo } = userRegister;

    //redirect to homepage
    const redirect = location.search ? location.search.split("=")[1] : "/";

    const handleSubmit = (event) => {
        event.preventDefault();

        var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        console.log(password, confirmPassword);

        
        if (email == null || email == "") {
            setMessage("Email is required");
        } else if (!email.match(mailFormat)){
            setMessage("Email is invalid");
        } else {
            dispatch(register(name, email, password, confirmPassword));
            setMessage(false);
        }
    }

    useEffect(() => {
        if(userInfo){
            history(redirect);
        };
    }, [history, userInfo, redirect]);


    return (
        <>
        <Form isLoading={isLoading} error={error}>
            {message ? <Message severity="error" form={true}>{ message }</Message> : null }
        </Form>
        <Link to="/">
        <img src="/assets/img/CycleX-Logo.png" width="150px" style={{margin: "auto", display:"block"}} alt="CycleX Logo" title="CycleX - Home"/>
        </Link>
        <Typography variant="h3" textAlign="center" sx={{padding: "30px 0px"}}>
            GETTING STARTED
        </Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={(event) => handleSubmit(event)}>
            <Stack spacing={2}>
                <TextField fullWidth label="NAME" id="name" required variant="outlined" 
                onChange={(event) => setName(event.target.value)}/>
                <TextField fullWidth label="EMAIL" id="email" required variant="outlined" 
                onChange={(event) => setEmail(event.target.value)}/>
                <TextField label="PASSWORD" required type="password" 
                onChange={(event) => setPassword(event.target.value)}/>
                <TextField label="CONFIRM PASSWORD" required type="password"
                onChange={(event) => setConfirmPassword(event.target.value)}/>
                {/* <Terms setTermsValid={setTermsValid}/> */}
            </Stack>
            <Stack sx={{margin: "20px 0"}} direction={{xs: "column", sm: "row"}} spacing={{xs: 1, sm: 2}}>
                <Button variant="contained" type="submit">
                    REGISTER
                </Button>
                <Button variant="contained" color="secondary" >
                    <Link to={redirect ? `/signin?redirect=${redirect}` : "/signin" } className={classes.noneTextDecoration}>
                        SIGN IN
                    </Link>
                </Button>
            </Stack>
        </Box>
        </>
    )
}