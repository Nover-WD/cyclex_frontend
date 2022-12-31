import {
    ITEM_LIST_REQUEST,
    ITEM_LIST_SUCCESS,
    ITEM_LIST_FAIL,
    ITEM_DETAIL_REQUEST,
    ITEM_DETAIL_SUCESS,
    ITEM_DETAIL_FAIL
} from "../constants/itemConstants.js";
import { ITEM_API_URL } from "../constants/apiConstants";
import axios from "axios";

export const listItems = () => async(dispatch) => {
    try {
        //this is for logging purposes to let us know when debugging our code that we are about to start requesting the Item List from the backend
        dispatch({ type: ITEM_LIST_REQUEST });

        //get the item list from the backend(api call)
        const {data} = await axios({
            method: "get",
            baseURL: ITEM_API_URL,
            url: "/"
        });

        dispatch({
            type: ITEM_LIST_SUCCESS,
            payload: data
        });
    } 
    catch (error) {
        dispatch({
            type: ITEM_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message : error.message
        });
    }
};

export const listItemDetail = (id) => async(dispatch) => {
    try {
        dispatch({ type: ITEM_DETAIL_REQUEST});
        
        //get the data from backend(api call)
        const {data} = await axios({
            method: "get",
            baseURL: ITEM_API_URL,
            url: `/${id}` //get the id from url route params
        });

        //pass the data and pass to reducer
        dispatch({
            type: ITEM_DETAIL_SUCESS, 
            payload: data
        })
    } 
    catch (error) {
        dispatch({
            type: ITEM_DETAIL_FAIL,
            payload:
                error.response && error.response.data.message 
                ? error.response.data.message : error.message
        });
    }
}