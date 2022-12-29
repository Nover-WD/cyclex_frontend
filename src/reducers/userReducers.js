import { 
    USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, 
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, 
    USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL, 
    UPDATE_PROFILE_RESET, 
    DELETE_PROFILE_REQUEST, DELETE_PROFILE_SUCCESS, DELETE_PROFILE_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_SUCCESS_RESET, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL, SEND_PASSWORD_REQUEST, SEND_PASSWORD_SUCCESS, SEND_PASSWORD_FAIL, ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAIL, ADD_USER_ERROR_RESET
 } from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type){
        case  USER_LOGIN_REQUEST:
            return { isLoading: true, payload: []};
        case USER_LOGIN_SUCCESS:
            return { isLoading: false, userInfo: action.payload};
        case USER_LOGIN_FAIL:
            return { isLoading: false, error: action.payload};
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {isLoading: true};
        case USER_REGISTER_SUCCESS:
            return {isLoading: false, userInfo: action.payload};
        case USER_REGISTER_FAIL:
            return {isLoading: false, error: action.payload};
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};


export const userProfileReducer = (state= { user: {} }, action) => {
    switch(action.type){
        case USER_PROFILE_REQUEST:
            return { isLoading: true, ...state };
        case USER_PROFILE_SUCCESS:
            return { isLoading: false, user: action.payload};
        case USER_PROFILE_FAIL:
            return { isLoading: false, error: action.payload};
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const updateProfileReducer = (state = {}, action ) => {
    switch(action.type){
        case UPDATE_PROFILE_REQUEST:
            return { isLoading: true };
        case UPDATE_PROFILE_SUCCESS:
            return { isLoading: false, success: true, userInfo: action.payload};
        case UPDATE_PROFILE_FAIL:
            return { isLoading: false, error: action.payload};
        case UPDATE_PROFILE_RESET:
            return {};
        default:
            return state;
    }
};

export const deleteProfileReducer = (state = {}, action) => {
    switch(action.type){
        case DELETE_PROFILE_REQUEST:
            return { isLoading: true };
        case DELETE_PROFILE_SUCCESS:
            return { isLoading: false, deleteSuccess: true};
        case DELETE_PROFILE_FAIL:
            return { isLoading: false, error: action.payload};
        default:
            return state;
    }
};

export const forgotPasswordReducer = (state = {}, action) => {
    switch(action.type){
        case FORGOT_PASSWORD_REQUEST:
            return { isLoading: true };
        case FORGOT_PASSWORD_SUCCESS:
            return { isLoading: false, sentResetLink: action.payload};
        case FORGOT_PASSWORD_FAIL:
            return { isLoading: false, error: action.payload};
        default:
            return state;
    }
};

//ADMIN PANEL
export const getAllUsersReducer = (state = {}, action) => {
    switch(action.type){
        case GET_USERS_REQUEST:
            return {isUsersLoading: true};
        case GET_USERS_SUCCESS:
            return { isUsersLoading: false, allUsers: action.payload };
        case GET_USERS_FAIL:
            return { isUsersLoading: false, usersError: action.payload };
        default:
            return state;
    }
}

export const updateUserReducer = (state = {}, action) => {
    switch(action.type){
        case UPDATE_USER_REQUEST:
            return {isLoading: true};
        case UPDATE_USER_SUCCESS:
            return {isLoading: false, success: true};
        case UPDATE_USER_FAIL:
            return {isLoading: false, error: action.payload}
        case UPDATE_SUCCESS_RESET:
            return {isLoading: false, success: false};
        default:
            return state;
    }
}

export const deleteUserReducer = (state = {}, action) => {
    switch(action.type){
        case DELETE_USER_REQUEST:
            return {isDeleteLoading: true};
        case DELETE_USER_SUCCESS:
            return {isDeleteLoading: false, deleteSuccess: true};
        case DELETE_USER_FAIL:
            return {isDeleteLoading: false, deleteError: action.payload};
        default:
            return state;
    }
}

export const sendPasswordResetReducer = (state = {}, action) => {
    switch(action.type){
        case SEND_PASSWORD_REQUEST:
            return {isSendPasswordLoading: true};
        case SEND_PASSWORD_SUCCESS:
            return {isSendPasswordLoading: false, sendPasswordSuccess: true};
        case SEND_PASSWORD_FAIL:
            return {isSendPasswordLoading: false, sendPasswordError: action.payload};
        default:
            return state;
    }
};

export const addNewUserReducer = (state = {}, action) => {
    switch(action.type){
        case ADD_USER_REQUEST:
            return {isAddUserLoading: true};
        case ADD_USER_SUCCESS:
            return {isAddUserLoading: false, addUserSuccess: true};
        case ADD_USER_FAIL:
            return {isAddUserLoading: false, addUserError: action.payload};
        case ADD_USER_ERROR_RESET:
            return {isAddUserLoading: false, addUserError: false};
        default:
            return state;
    }
} 