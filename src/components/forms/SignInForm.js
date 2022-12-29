import React, { useEffect, useState } from "react";
// import FormButton from "../Button";
// import Email from "../Email";
// import Password from "../Password";
import RememberMe from "../RememberMe";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Stack, TextField, Button, Alert, Collapse, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

//redux
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../src/actions/userActions";

//components
import Form from "../Form";

const useStyles = makeStyles((theme) => ({
    noneTextDecoration: {
        textDecoration: "none",
        color: theme.palette.secondary.light
    }
}));
export default function SignInForm(){
    const classes = useStyles();
    const history = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isAlertOpen, setIsAlertOpen] = useState(true);

    //redux
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { isLoading, error, userInfo } = userLogin;
    const deleteProfile = useSelector((state) => state.deleteProfile);
    const { deleteSuccess } = deleteProfile;

    const redirect = location.search ? location.search.split("=")[1] : "/";

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(login(email, password));
    }

    useEffect(() => {
        if(userInfo) {
            history(redirect);
        }
    }, [history, userInfo, redirect]);

    return(
        <>
            { deleteSuccess ? (
                <Collapse in={isAlertOpen}>
                    <Alert action={<IconButton onClick={() => setIsAlertOpen(false)} size="small"><CloseIcon fontSize="inherit"/></IconButton>}>Your account is now deleted</Alert> 
                </Collapse>
                ) : null }
            <Form isLoading={isLoading} error={error}/>
                <Link to="/">
                    <img src="/assets/img/CycleX-Logo.png" width="150px" style={{margin: "auto", display:"block"}} alt="CycleX Logo" title="CycleX - Home"/>
                </Link>
                <Typography variant="h3" textAlign="center" sx={{padding: "30px 0px"}}>
                    SIGN IN
                </Typography>
                <Box component="form" noValidate autoComplete="off" onSubmit={(event) => handleSubmit(event)}>
                    <Stack spacing={2}>
                        <TextField fullWidth label="EMAIL" id="email" required variant="outlined" 
                        onChange={(event) => setEmail(event.target.value)}/>
                        <TextField label="PASSWORD" required type="password" 
                        onChange={(event) => setPassword(event.target.value)}/>
                        <RememberMe/>
                        <Typography>
                            <Link to="/forgot">FORGOT PASSWORD?</Link>
                        </Typography>
                    </Stack>
                    <Stack sx={{margin: "20px 0"}} direction={{xs: "column", sm: "row"}} spacing={{xs: 1, sm: 2}}>
                        <Button variant="contained" type="submit">
                        LOGIN
                        </Button>
                        <Button variant="contained" color="secondary" >
                            <Link to={redirect ? `/signup?redirect=${redirect}` : "/signup" } color="#fff" className={classes.noneTextDecoration}>
                                SIGN UP
                            </Link>
                        </Button>
                    </Stack>
                </Box>
        </>
    )
}