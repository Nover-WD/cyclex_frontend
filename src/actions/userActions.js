import axios from "axios";
import { USER_API_URL } from "../constants/apiConstants";
import { DELETE_PROFILE_FAIL, DELETE_PROFILE_REQUEST, DELETE_PROFILE_SUCCESS, FORGOT_PASSWORD_FAIL, 
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, 
    UPDATE_PROFILE_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, 
    USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAIL,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_SUCCESS_RESET, DELETE_USER_REQUEST, 
    DELETE_USER_SUCCESS, DELETE_USER_FAIL, SEND_PASSWORD_REQUEST, SEND_PASSWORD_SUCCESS, SEND_PASSWORD_FAIL, ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAIL, ADD_USER_ERROR_RESET} from "../constants/userConstants";

export const login = (email, password) => async(dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });

        const { data } = await axios({
            method: "POST",
            baseURL: USER_API_URL,
            url: "/login",
            headers: {
                "Content-type": "application/json"
            },
            data: {
                email: email,
                password: password
            }
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } 
    catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const logout = () => async(dispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");

    dispatch({
        type: USER_LOGOUT
    });
};

export const register = (name, email, password, confirmPassword) => async(dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        });
    
        const { data } = await axios({
            method: "POST",
            baseURL: USER_API_URL,
            url: "/",
            headers: {
                "Content-type": "application/json"
            },
            data: {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
        });
    
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

        //login to user directly
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } 
    catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const getUserProfile = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_PROFILE_REQUEST
        });
    
        //get the userInfo state
        const { userLogin: { userInfo } } = getState();
    
        const { data } = await axios({
            method: "GET",
            baseURL: USER_API_URL,
            url: `/${id}`,
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            },
        });
    
        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data
        });
    }
    catch(error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const updateUserProfile = (user) => async(dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_PROFILE_REQUEST
        });
    
        const { userLogin: { userInfo } } = getState();
        
        const {data} = await axios({
            method: "PUT",
            baseURL: USER_API_URL,
            url: "/profile",
            headers: {
                "Content-type":"application/json",
                Authorization: `Bearer ${userInfo.token}`
            },
            data: user
        });
    
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    catch(error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        });
    }
};

export const deleteUserProfile = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_PROFILE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        await axios({
            method: "DELETE",
            baseURL: USER_API_URL,
            url: "/profile",
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });

        dispatch({
            type: DELETE_PROFILE_SUCCESS
        });
    } 
    catch(error) {
        dispatch({
            type: DELETE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const userForgotPassword = (email) => async(dispatch) => {
    try {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });

        await axios({
            method: "POST",
            baseURL: USER_API_URL,
            url: "/email",
            headers: {
                "Content-type": "application/json"
            },
            data: {
                email: email
            }
        });

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: "Password reset link has been sent. Please check your email."
        });
    }
    catch(error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message && error.response ? error.response.data.message : error.message
        });
    }
}

//ADMIN PANEL
export const getAllUsers = () => async(dispatch) => {
    try { 
        dispatch({
            type: GET_USERS_REQUEST
        });
    
        const { data } = await axios({
            method: "GET",
            baseURL: USER_API_URL,
            url: "/users-tool"
        });
    
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: data
        });
    }
    catch (error){
        dispatch({
            type: GET_USERS_FAIL,
            payload: error.response.data.message && error.response ? error.response.data.message : error.message 
        })
    }
}

export const updateUser = (userId, name, email, password, isAdmin) => async(dispatch) => {
    try {
        dispatch({
            type: UPDATE_USER_REQUEST
        });
        
        await axios({
            method: "PUT",
            baseURL: USER_API_URL,
            url: "/users-tool",
            headers: {
                "Content-type": "application/json"
            },
            data: {
                userId,
                name, 
                email,
                password,
                isAdmin
            }
        });
    
        dispatch({
            type: UPDATE_USER_SUCCESS
        });
    }
    catch(error){
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message && error.response ? error.response.data.message : error.message 
        });
    }
}

export const updateResetSuccess = () => async(dispatch) => {
    dispatch({
        type: UPDATE_SUCCESS_RESET
    });
}

export const deleteUser = (userId) => async(dispatch) => {
    try {
        dispatch({
            type: DELETE_USER_REQUEST
        });

        await axios({
            method: "DELETE",
            baseURL: USER_API_URL,
            url: "/users-tool",
            data: {
                userId
            }
        });

        dispatch({
            type: DELETE_USER_SUCCESS
        });
    }
    catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message && error.response ? error.response.data.message : error.message 
        })
    }
}


export const sendPasswordReset = (email) => async(dispatch) => {
    try {
        dispatch({
            type: SEND_PASSWORD_REQUEST
        });
    
        await axios({
            method: "POST",
            baseURL: USER_API_URL,
            url: "/users-tool",
            data: {
                email
            }
        });
    
        dispatch({
            type: SEND_PASSWORD_SUCCESS
        })
    }
    catch(error){
        dispatch({
            type: SEND_PASSWORD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const addNewUser = (name, email, password, isAdmin) => async(dispatch) => {
    try {
        dispatch({
            type: ADD_USER_REQUEST
        });
    
        await axios({
            method: "POST",
            baseURL: USER_API_URL,
            url: "/add-user",
            data: {
                name,
                email,
                password,
                isAdmin
            }
        });
    
        dispatch({
            type: ADD_USER_SUCCESS
        });
    }
    catch (error){
        dispatch({
            type: ADD_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const addNewUserErrorReset = () => async(dispatch) => {
    dispatch({
        type: ADD_USER_ERROR_RESET
    });
}

