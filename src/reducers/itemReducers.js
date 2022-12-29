import {
    ITEM_LIST_REQUEST,
    ITEM_LIST_SUCCESS,
    ITEM_LIST_FAIL,
    ITEM_DETAIL_REQUEST,
    ITEM_DETAIL_SUCESS,
    ITEM_DETAIL_FAIL
} from "../constants/itemConstants.js";

export const itemListReducer = (state = { items: [] }, action) => {
    switch(action.type){
        case ITEM_LIST_REQUEST:
            return { isLoading: true, items: [] };
        //the data is from the actions
        case ITEM_LIST_SUCCESS:
            return { isLoading: false, items: action.payload };
        case ITEM_LIST_FAIL:
            return { isLoading: false, error: action.payload };
        default:
            return state;
    }
};

export const listDetailReducer = (state = { item : { reviews: [] } }, action) => {
    switch(action.type){
        case ITEM_DETAIL_REQUEST:
            return { isLoading: true, ...state};
        case ITEM_DETAIL_SUCESS:
            return { isLoading: false, item: action.payload};
        case ITEM_DETAIL_FAIL:
            return { isLoading: false, error: action.payload};
        default:
            return state;
    }
}

