import axios from "axios";
import { CART_APPEND_ITEM, CART_REQUEST_SUCCESS, CART_REMOVE_ITEM, REMOVE_ITEMS_SUCCESS } from "../constants/cartConstants";
import { CART_API_URL, ITEM_API_URL } from "../constants/apiConstants";

const serverUrl = "https://cyclexbackend.adaptable.app";

export const addToCart = (id, qty, userId) => async(dispatch, getState) => {
    
    //get the specific item on server
    const {data} = await axios({
        method: "get",
        url: serverUrl + ITEM_API_URL + `/${id}` 
    });

    //send the specific item to cartItems(server)
    const cartItem = await axios({
        method: "POST",
        url: serverUrl + CART_API_URL + "/",
        data: {
            userId,
            itemId: data._id,
            name: data.name,
            brand: data.brand,
            image: data.image,
            price: data.price,
            qty,
            countInStock: data.countInStock
        }
    }).catch((err) => console.log(err.message));

    //get from server the cartItem data and sent it to reducer
    dispatch({
        type: CART_APPEND_ITEM,
        payload: cartItem.data
    });
    
    //refresh the localstorage
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//Create another action when the user logged in it will get all the user cart items
export const requestCartItems = (userId) => async(dispatch, getState) => {

    const { data } = await axios({
        method: "GET",
        url: serverUrl + CART_API_URL + `/user-cart-items/${userId}`
    });


    dispatch({
        type: CART_REQUEST_SUCCESS,
        payload: data
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (id) => async(dispatch, getState) => {
    //remove from db
    await axios({
        method: "DELETE",
        url: serverUrl + CART_API_URL + "/remove",
        data: {
            cartId: id
        }
    });
    
    //remove in redux state
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    });

    //refresh the localstorage
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const removeCartItems = () => async(dispatch) => {
    dispatch({
        type: REMOVE_ITEMS_SUCCESS
    })
}
