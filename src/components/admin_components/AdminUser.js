import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Stack, TextField, TableContainer, TableHead,
TableRow, TableBody, Table, Divider, DialogContent, RadioGroup, FormControlLabel, Dialog, 
FormLabel, Radio, DialogActions, Collapse, Alert, IconButton } from "@mui/material";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import { makeStyles, styled } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateUser, updateResetSuccess, deleteUser, sendPasswordReset, addNewUser, 
    addNewUserErrorReset } from "../../actions/userActions";

//react-router
import { useNavigate } from "react-router-dom";

//files
import AdminLoader from "./AdminLoader";
import Message from "../Message";

const useStyles = makeStyles((theme) => ({
    tablehead: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.light
    }
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    }
  }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const AdminUser = () => {
    //Add User State
    const [addName, setAddName] = useState("");
    const [addEmail, setAddEmail] = useState("");
    const [addPassword, setAddPassword] = useState("");
    const [addIsAdmin, setAddIsAdmin] = useState(false);


    //Update User State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userError, setUserError] = useState();

    //Alert State
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(true);
    const [isAlertOpen, setIsAlertOpen] = useState(true);
    const [isSendPasswordAlertOpen, setIsSendPasswordAlertOpen] = useState(true);
    const [isAddAlert, setIsAddAlert] = useState(true);
    const [addUserValidation, setAddUserValidation] = useState();
    
    //Dialogs State
    const [isEditOpen, setIsEditOpen] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(null);
    const [isAddOpen, setIsAddOpen] = useState(null);

    const history = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { isUsersLoading, allUsers, usersError } = useSelector((state) => state.getAllUsers);
    const { isLoading, success} = useSelector((state) => state.updateUser);
    const {isDeleteLoading, deleteSuccess, deleteError} = useSelector((state) => state.deleteUser);
    const {isSendPasswordLoading, sendPasswordSuccess, sendPasswordError} = useSelector((state) => state.sendPasswordReset);
    const {isAddUserLoading, addUserSuccess, addUserError} = useSelector((state) => state.addNewUser)

    //DELETE ACTION
    const handleDeleteOpen = (userId) => {
        setUserId(userId)
        setIsDeleteOpen(true);
    }

    const handleDeleteClose = () => {
        setIsDeleteOpen(false);
    }

    const handleDeleteUser = () => {
        dispatch(deleteUser(userId));
    }

    const handleDeleteAlert = () => {
        setIsDeleteAlertOpen(false);
    }
    //ADD ACTION
    const handleAddOpen = () => {
        setIsAddOpen(true);
    }

    const handleAddClose = () => {
        setIsAddOpen(false);
    }

    const handleAddSubmit = (event) => {
        event.preventDefault();
        
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(addName == "" || addEmail == "" || addPassword == ""){
            setAddUserValidation("All field is required");
        } else if (!addEmail.match(mailFormat)){
            setAddUserValidation("Email is invalid");
        } else if (addPassword.length < 7){
            setAddUserValidation("Password minimum character is 7")
        } else {
            setAddUserValidation(false);
            dispatch(addNewUserErrorReset());
            setIsAddAlert(true);
            dispatch(addNewUser(addName, addEmail, addPassword, addIsAdmin))
        }
    }

    const handleAddAlert = () => {
        setIsAddAlert(false);
    }

    //EDIT ACTION
    const handleEditOpen = (userId, name, email) => {
        setIsEditOpen(true);
        setUserId(userId);
        setName(name);
        setEmail(email);
        dispatch(updateResetSuccess());
    };

    const handleEditClose = () => {
        setIsEditOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(name == "" || email == "" || password == ""){
            setUserError("All field is required");
        } else if (!email.match(mailFormat)){
            setUserError("Email is invalid");
        } else if (password.length < 7){
            setUserError("Password minimum character is 7")
        } else {
            dispatch(updateUser(userId, name, email, password, isAdmin));
        }
    };

    const handleAlert = () => {
        setIsAlertOpen(false);
        dispatch(updateResetSuccess());
    }

    //SEND PASSWORD RESET ACTION
    const handleSendPasswordReset = (email) => {
        setIsSendPasswordAlertOpen(true);
        dispatch(sendPasswordReset(email));
    }

    const handleSendPasswordAlert = () => {
        setIsSendPasswordAlertOpen(false);
    }

    useEffect(() => {
        if(success){
            setUserError(false);
            setIsEditOpen(false);
            history(`/admin?tab=2`);
            setIsAlertOpen(true);
        }

        if(deleteSuccess){
            setIsDeleteOpen(false);
            history(`/admin?tab=2`);
        }

        if(addUserSuccess){
            setIsAddOpen(false);
            history("/admin?tab=2");
            //reset add user success here, that makes view loads
        }
    
        dispatch(getAllUsers());
    }, [dispatch, success, deleteSuccess, addUserSuccess]);

    //click edit, find the user info filtered by user id
    return (
        <Box sx={{ heigth: "100vh", width: "85vw", padding: "30px 30px", margin: "0 auto"}}>
            {addUserSuccess ? (
                <Collapse in={isAddAlert}>
                    <Alert sx={{marginBottom: "20px"}} action={<IconButton onClick={handleAddAlert} size="small"><CloseIcon fontSize="inherit"/></IconButton>}>User added</Alert> 
                </Collapse>
            ) : null}
            {success ? (
                <Collapse in={isAlertOpen}>
                    <Alert sx={{marginBottom: "20px"}} action={<IconButton onClick={handleAlert} size="small"><CloseIcon fontSize="inherit"/></IconButton>}>User updated</Alert> 
                </Collapse>
            ) : null}
            {deleteSuccess ? (
                <Collapse in={isDeleteAlertOpen}>
                    <Alert sx={{marginBottom: "20px"}} action={<IconButton onClick={handleDeleteAlert} size="small"><CloseIcon fontSize="inherit"/></IconButton>}>User deleted</Alert> 
                </Collapse>
            ) : null}
             {isSendPasswordLoading ? (<AdminLoader form={true} loaderMessage="Sending Password Reset"/>) : sendPasswordSuccess ? (
                <Collapse in={isSendPasswordAlertOpen}>
                    <Alert sx={{marginBottom: "20px"}} action={<IconButton onClick={handleSendPasswordAlert} size="small"><CloseIcon fontSize="inherit"/></IconButton>}>Password reset is sent!</Alert> 
                </Collapse>
            ) : sendPasswordError ?
                (  
                <Collapse in={isSendPasswordAlertOpen}>
                    <Alert severity="error" sx={{marginBottom: "20px"}} action={<IconButton onClick={handleSendPasswordAlert} size="small"><CloseIcon fontSize="inherit"/></IconButton>}>{sendPasswordError}</Alert> 
                </Collapse>)
            : null}
            {isUsersLoading ? (<AdminLoader loaderMessage="Fetching Users"/>) : 
            usersError ? (<Message severity="error" form={true}>{usersError}</Message>) : allUsers ? (
                <>
                <Stack direction="row" spacing={2} sx={{mb: "20px"}}>
                    <Typography variant="h2">Users</Typography>
                    <Button variant="contained" size="small" onClick={handleAddOpen}>
                        <Typography variant="h6" fontWeight={400}>Add New</Typography>
                    </Button>
                </Stack>
                <Box>
                <Stack direction="row" justifyContent="space-between" sx={{mb: "20px"}}>
                    <Typography sx={{alignSelf: "end"}}>
                        All ({ allUsers.length }) , Admin ({allUsers.reduce((initialValue, user) => user.isAdmin ? 1 + initialValue : initialValue, 0)}), 
                        Shopper ({allUsers.reduce((initialValue, user) => !user.isAdmin ? 1 + initialValue : initialValue, 0)})
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <TextField type="text"/>
                        <Button variant="contained" size="small">
                            <Typography variant="h6" fontWeight={400}>Search Users</Typography>
                        </Button>
                    </Stack>
                </Stack>
                <TableContainer>
                    <Table>
                        <TableHead className={classes.tablehead}>
                            <TableRow>
                                <StyledTableCell>
                                    <Typography>Name</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography>Email</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography>Role</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography>Last Login</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography></Typography>
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                    {allUsers.map((users) => (
                        <TableBody>
                            <StyledTableRow key={users._id}>
                                <TableCell>
                                    {users.name}
                                </TableCell>
                                <TableCell>
                                    {users.email}
                                </TableCell>
                                <TableCell>
                                    {users.isAdmin ? "Admin" : "Shopper"}
                                </TableCell>
                                <TableCell>
                                    { users.lastLogin }
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem/>}>
                                        <Button onClick={() => handleEditOpen(users._id, users.name, users.email)}>
                                            <Typography variant="h6" fontWeight={400}>Edit</Typography>
                                        </Button>
                                        <Button onClick={() => handleDeleteOpen(users._id)}>
                                            <Typography color="error" variant="h6" fontWeight={400}>DELETE</Typography>
                                        </Button>
                                        <Button onClick={() => handleSendPasswordReset(users.email)}>
                                            <Typography variant="h6" fontWeight={400}>Send Password Reset</Typography>
                                        </Button>
                                    </Stack>              
                                </TableCell>
                            </StyledTableRow>
                        </TableBody>
                        ))}
                        <Dialog open={isAddOpen} onClose={(event) => handleAddClose(event)}>
                            {isAddUserLoading ? (<AdminLoader form={true} loaderMessage="Adding User"/>) : 
                            addUserValidation ? (<Message severity="error" form={true}>{addUserValidation}</Message>) : 
                            addUserError ? (<Message severity="error" form={true}>{addUserError}</Message>) : null}
                            <Typography variant="h4" textAlign="center" sx={{paddingTop: "20px"}}>
                                ADD USER
                            </Typography>
                            <Box component="form" noValidate autoComplete="off" onSubmit={handleAddSubmit}>
                                <DialogContent>
                                    <Stack spacing={2}>
                                        <TextField type="text" value={addName} fullWidth label="NAME" onChange={(event) => setAddName(event.target.value)}/>
                                        <TextField type="text" value={addEmail} fullWidth label="EMAIL" onChange={(event) => setAddEmail(event.target.value)}/>
                                        <TextField type="text" value={addPassword} fullWidth label="PASSWORD" onChange={(event) => setAddPassword(event.target.value)}/>
                                        <FormLabel>ROLE</FormLabel>
                                        <RadioGroup row defaultValue="shopper">
                                            <FormControlLabel value="admin" control={<Radio/>} label="ADMIN" onClick={() => setAddIsAdmin(true)}/>
                                            <FormControlLabel value="shopper" control={<Radio/>} label="SHOPPER" onClick={() => setAddIsAdmin(false)}/>
                                        </RadioGroup>
                                    </Stack>
                                </DialogContent>
                                <DialogActions sx={{paddingBottom: "30px", justifyContent: "center"}}>
                                    <Button variant="contained" type="submit" color="primary">
                                        ADD
                                    </Button>
                                    <Button variant="contained" onClick={handleAddClose} color="secondary">
                                        CLOSE
                                    </Button>
                                </DialogActions>
                            </Box>
                        </Dialog>
                        <Dialog open={isEditOpen} onClose={handleEditClose}>
                            {userError ? (<Message severity="error" form={true}>{userError}</Message>) : null}
                            <Typography variant="h4" textAlign="center" sx={{paddingTop: "20px"}}>
                                UPDATE USER
                            </Typography>
                            <Box component="form" noValidate autoComplete="off" onSubmit={(event) => handleSubmit(event)}>
                                <DialogContent sx={{padding: "20px 40px!important"}}>
                                    <Stack spacing={2}> 
                                        <TextField label="NAME" type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                                        <TextField label="EMAIL" type="text" value={email} onChange={(event) => setEmail(event.target.value)}/>
                                        <TextField label="PASSWORD" type="text" value={password} onChange={(event) => setPassword(event.target.value)}/>
                                        <FormLabel>ROLE</FormLabel>
                                        <RadioGroup row defaultValue="shopper">
                                            <FormControlLabel value="admin" control={<Radio/>} label="ADMIN" onClick={() => setIsAdmin(true)}/>
                                            <FormControlLabel value="shopper" control={<Radio/>} label="SHOPPER" onClick={() => setIsAdmin(false)}/>
                                        </RadioGroup>
                                    </Stack>
                                </DialogContent>
                                <DialogActions sx={{paddingBottom: "30px", justifyContent: "center"}}>
                                    <Button variant="contained" type="submit" color="primary">
                                        UPDATE
                                    </Button>
                                    <Button variant="contained" onClick={handleEditClose} color="secondary">
                                        CLOSE
                                    </Button>
                                </DialogActions>
                            </Box>
                        </Dialog>
                        <Dialog open={isDeleteOpen} onClose={handleDeleteClose}>
                            {isDeleteLoading ? (<AdminLoader form={true}/>) : deleteError ? 
                            (<Message severity="error" form={true}>{deleteError}</Message>) : null}
                            <Typography variant="h4" textAlign="center" sx={{paddingTop: "20px"}}>
                                DELETE USER
                            </Typography>
                            <DialogContent>
                                    <Typography sx={{marginBottom: "20px"}}>Are you sure you want to delete the user?</Typography>
                                    <Stack direction={{xs: "column", sm: "row"}}  spacing={{xs: 2, sm: 2}} justifyContent="center">
                                        <Button variant="contained" color="error" onClick={handleDeleteUser}>
                                            Yes
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={handleDeleteClose}>
                                            No
                                        </Button>
                                    </Stack>
                            </DialogContent>
                        </Dialog>
                        </Table>
                    </TableContainer>
                </Box>
                </>
            ): null}
        </Box>);
}

export default AdminUser;