import { CART_APPEND_ITEM, CART_REQUEST_SUCCESS, CART_REMOVE_ITEM, REMOVE_ITEMS_SUCCESS } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type){
        case CART_APPEND_ITEM:
            const newItem = action.payload;
        
            //check the id if it have on cartItems state
            const itemInCart = state.cartItems.find(
                (items) => items.item === newItem.item 
            );

            /*if the item is already inside the cart
            will update the item info with the new qty that 
            was pass from the action.payload 
            else will append the new item inside the cart 
            items state*/
            if(itemInCart) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((items) => 
                        items.item === itemInCart.item ? newItem : items
                    )
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, newItem],
                }
            };

        case CART_REMOVE_ITEM:
            return {
                ...state,
                //back the items that not equal to the id
                cartItems: state.cartItems.filter((items) => 
                    items._id !== action.payload
                )
            };
        case CART_REQUEST_SUCCESS:
            return {
                cartItems: action.payload
            };
        case REMOVE_ITEMS_SUCCESS:
            return {
                cartItems : []
            };
        default: 
            return state;
        }
}


