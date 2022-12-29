import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, Stack, Paper, Typography, Button, Dialog, DialogContent, TextField, DialogActions } from "@mui/material";

//components
import Form from "../Form";
import Message from "../Message";
import TopBanner from "../TopBanner";
import Footer from "../Footer";
import PrimaryMenu from "../PrimaryMenu";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, updateUserProfile, deleteUserProfile, logout } from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

//react-router-dom
import {  useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: theme.palette.primary.main,
        width: "56px",
        height: "56px"
    },
    dialog: {
        padding: "50px"
    }
}));

const Profile = () => {
    const classes = useStyles();
    const history = useNavigate();
    
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [message, setMessage] = useState(null);


    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userProfile = useSelector((state) => state.userProfile);
    const {isLoading, error, user} = userProfile;

    const updateProfile = useSelector((state) => state.updateProfile);
    const { success } = updateProfile;

    const handleUpdateDialog = () => {
        setIsUpdateOpen(true);
    };

    const handleUpdateDialogClose = () => {
        setIsUpdateOpen(false);
    }

    const handleUpdate = (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            setMessage("Password do not match");
        } 
        else {
            dispatch(updateUserProfile({id: user.id, name: name, email: email, password: password}));
        }
    };

    const handleDeleteDialog = () => {
        setIsDeleteOpen(true);
    }

    const handleDeleteDialogClose = () => {
        setIsDeleteOpen(false);
    }

    const handleDelete = () => {
        dispatch(deleteUserProfile());
        dispatch(logout());
        history("/signin");
    };

    useEffect(() => {
        if(!userInfo) {
            history("/signin")
        } else {
            if( !user || success){
                dispatch({
                    type: UPDATE_PROFILE_RESET
                });

                dispatch(getUserProfile("profile"));
                setIsUpdateOpen(false);
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [userInfo, history, dispatch, user, success]);

    return (
        <>
            <TopBanner/>
            <PrimaryMenu/>
            <Box sx={{padding: "60px", '@media (max-width: 600px)' : {padding: '30px 30px'}}}>
                <Paper
                    elevation={4} sx={{width: "480px", padding: "40px 30px", backgroundColor: "primary.light",
                    margin: "auto",
                    '@media (max-width: 600px)': {
                        width: '100%'
                    }
                    }}
                >
                    <Stack spacing={1} alignItems="center">
                        <Avatar className={classes.avatar}>
                            <Typography variant="h3">
                                { userInfo ? userInfo.name[0] : null }
                            </Typography>
                        </Avatar>
                        <Typography variant="h4">
                            { userInfo ? userInfo.name : null }
                        </Typography>
                        <Typography variant="h5">
                            { userInfo ? userInfo.email : null }
                        </Typography>
                        <Stack direction={{xs: "column", sm: "row"}} spacing={{xs: 1, sm: 2}}>
                            <Button variant="contained" type="submit" onClick={handleUpdateDialog}>
                                EDIT PROFILE
                            </Button>
                            <Dialog open={isUpdateOpen} onClose={handleUpdateDialogClose}>
                                <Form isLoading={isLoading} error={error}>
                                    { message ? <Message severity="error" form={true}>{message}</Message> : null}
                                </Form>
                                <Typography variant="h4" textAlign="center" sx={{paddingTop: "20px"}}>
                                    UPDATE PROFILE
                                </Typography>
                                <Box component="form" noValidate autoComplete="off" onSubmit={(event) => handleUpdate(event)}>
                                    <DialogContent sx={{padding: "20px 40px!important"}}>
                                        <Stack spacing={2}>
                                                <TextField fullWidth label="NAME" type="text" value={name} variant="outlined" onChange={(event) => setName(event.target.value)}>
                                                </TextField>
                                                <TextField fullWidth label="EMAIL" type="email" value={email} variant="outlined" onChange={(event) => setEmail(event.target.value)}>
                                                </TextField>
                                                <TextField fullWidth label="PASSWORD" variant="outlined" type="password" onChange={(event) => setPassword(event.target.value)}>
                                                </TextField>
                                                <TextField fullWidth label="CONFIRM PASSWORD" variant="outlined" type="password" onChange={(event) => setConfirmPassword(event.target.value)}>
                                                </TextField>
                                        </Stack>
                                    </DialogContent>
                                    <DialogActions sx={{paddingBottom: "30px", justifyContent: "center"}}>
                                        <Stack direction={{xs: "column", sm: "row"}}  spacing={{xs: 2, sm: 2}} justifyContent="center">
                                            <Button variant="contained" color="primary" type="submit">
                                                UPDATE
                                            </Button>
                                            <Button variant="contained" color="secondary" onClick={handleUpdateDialogClose}>
                                                CLOSE
                                            </Button>
                                        </Stack>
                                    </DialogActions>
                                </Box>
                            </Dialog>
                            <Button variant="contained" color="error" onClick={handleDeleteDialog}>
                                DELETE ACCOUNT
                            </Button>
                            <Dialog open={isDeleteOpen} onClose={handleDeleteDialogClose}>
                                <Typography variant="h4" textAlign="center" sx={{paddingTop: "20px"}}>
                                        DELETE PROFILE
                                </Typography>
                                <DialogContent>
                                    <Typography sx={{marginBottom: "20px"}}>Are you sure you want to delete your profile/account?</Typography>
                                    <Stack direction={{xs: "column", sm: "row"}}  spacing={{xs: 2, sm: 2}} justifyContent="center">
                                        <Button variant="contained" color="error" onClick={handleDelete}>
                                            Yes
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={handleDeleteDialogClose}>
                                            No
                                        </Button>
                                    </Stack>
                                </DialogContent>
                            </Dialog>
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
            <Footer/>
        </>
    )
}

export default Profile;