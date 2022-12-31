import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Landing from "./components/pages/Landing";
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import Box from "@mui/material/Box";
import Registration from "./components/pages/Registration";
import Forgot from "./components/pages/Forgot";
import Login from "./components/pages/Login"
import DemoParams from "./components/DemoParams";
import Cart from "./components/pages/Cart";
import Item from "./components/item";
import Profile from "./components/pages/Profile";
import AdminPanel from "./components/pages/AdminPanel";
import Shop from "./components/pages/Shop";
import Checkout from "./components/pages/Checkout";

export default function App(){
  return (
    <>
    <Router>
          <ThemeProvider theme={theme}>
            <Box component="main">
                <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/signup" element={<Registration/>}/>
                <Route path="/forgot" element={<Forgot/>}/>
                <Route path="/signin" element={<Login/>}/>
                <Route path="/item/:id" element={<Item/>}/>
                <Route path="/p/:id" element={<DemoParams/>}/>
                <Route path="/cart/:id" element={<Cart/>}/>
                <Route path="/cart/" element={<Cart/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/shop" element={<Shop/>} />
                <Route path="/admin" element={<AdminPanel/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="*" element={<Landing/>}/>
              </Routes>
            </Box>
          </ThemeProvider>
    </Router>
    </>
  )
}


