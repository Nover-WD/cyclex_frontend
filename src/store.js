import  {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { itemListReducer, listDetailReducer } from "./reducers/itemReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer, userRegisterReducer, userProfileReducer, updateProfileReducer, 
    deleteProfileReducer, forgotPasswordReducer, getAllUsersReducer, updateUserReducer,
    deleteUserReducer, sendPasswordResetReducer, addNewUserReducer } from "./reducers/userReducers";

const reducer = combineReducers({
    itemList: itemListReducer,
    itemDetail: listDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    updateProfile: updateProfileReducer,
    deleteProfile: deleteProfileReducer,
    forgotPassword: forgotPasswordReducer,
    //ADMIN PANEL
    getAllUsers: getAllUsersReducer,
    updateUser: updateUserReducer,
    deleteUser: deleteUserReducer,
    sendPasswordReset: sendPasswordResetReducer,
    addNewUser: addNewUserReducer
});

//cart functionality
/*if cart items is existing, convert to object format else return
an empty array*/ 
const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")) :
    [];

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")): null;

//I think localStorage is for saving the item then pass in the store state
//define initial state that are coming from Storage
const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage}
};
//we could log our actions into redux devtools before redux passes continous
const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    //wrap the data from the devtools to pass the data from the middleware to devtools
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

