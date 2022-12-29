import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Dashboard, Inventory, Image, ArrowLeft, ArrowRight } from "@mui/icons-material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AdminDashboard from "./admin_components/AdminDashboard";
import AdminUser from "./admin_components/AdminUser";
import AdminItems from "./admin_components/AdminItems";
import $ from "jquery";

//react-router
import { useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    nav: {
        backgroundColor: theme.palette.secondary.main,
        width: "15vw"
    },
    navDuplicate: {
        backgroundColor: theme.palette.secondary.main,
        height: "100vh",
        width: "188px",
        zIndex: -1,
        position: "absolute"
    },
    navButton: {
        textTransform: "initial",
        color: theme.palette.primary.light,
        fontWeight: "400"
    },
    navShow: {
        display: 'none',
        position: "absolute",
        top: "275px"
    }
}))

const Sidebar = () => {
    const classes = useStyles();
    const history = useNavigate();
    const location = useLocation();

    //get the tab value
    const tab = location.search.split("=")[1];

    const [value, setValue] = useState(tab ? Number(tab) : 1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    
    //collapse sidebar issue here, history and jquery not compatible
    useEffect(() => {
        history(`?tab=${value}`);

        $(function(){
            $("#collapse-sidebar").on('click', () => {
                $("#nav-tabs").animate({width: '0vw'});
                $("#nav-tabs-duplicate").animate({width: '0px'});
                $("#add-sidebar").show();
                $("#tool-panel").animate({width: "100vw", display: "flex", justifyContent: "center", margin: "auto"});
            })
        
            $("#add-sidebar").on('click', () => {
                $("#nav-tabs").animate({width: '15vw'});
                $("#nav-tabs-duplicate").animate({width: '176px'});
                $("#add-sidebar").hide();
            })
        })
    }, [value]);

    return (
    <>
    <Box sx={{ width: '100%', display: "flex" }} >
        <Box className={classes.navDuplicate} id="nav-tabs-duplicate">
        </Box>
        <Tabs value={value} onChange={handleChange} orientation="vertical" className={classes.nav} id="nav-tabs">
            <Tab className={classes.navButton} value={1} label="Dashboard" icon={<Dashboard/>} iconPosition="start"/>
                <Tab className={classes.navButton} value={2} label="User" icon={<PersonAddAltIcon/>} iconPosition="start"/>
            <Tab className={classes.navButton} value={3} label="Items" icon={<Inventory/>} iconPosition="start"/>
            <Tab className={classes.navButton} value={4} label="Images" icon={<Image/>} iconPosition="start"/>
            <Button id="collapse-sidebar">
                <ArrowLeft fontSize="large"/>
                <Typography>Collapse</Typography>
            </Button>
        </Tabs>
        <Box id="tool-panel" sx={{margin: "0px"}}>
            { value === 1 ? (<AdminDashboard/>): value === 2 ? (<AdminUser/>) : value === 3 ? (<AdminItems/>) : null}
        </Box>
      </Box>
      <Button id="add-sidebar" className={classes.navShow}><ArrowRight fontSize="large" sx={{margin: "10px 0 0 0"}}/></Button>
      </>
    )
}

export default Sidebar;