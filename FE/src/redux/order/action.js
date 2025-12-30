import api from "@/config/api";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    FETCH_USER_ORDERS_REQUEST,
    FETCH_USER_ORDERS_SUCCESS,
    FETCH_USER_ORDERS_FAILURE,
    FETCH_ORDER_BY_ID_REQUEST,
    FETCH_ORDER_BY_ID_SUCCESS,
    FETCH_ORDER_BY_ID_FAILURE
} from "./actionType";

export const createOrder = (orderData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const response = await api.post('/orders', orderData);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data });
        return response.data;
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
        throw error;
    }
};

export const fetchUserOrders = () => async (dispatch) => {
    dispatch({ type: FETCH_USER_ORDERS_REQUEST });
    try {
        const response = await api.get('/orders');
        dispatch({ type: FETCH_USER_ORDERS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_USER_ORDERS_FAILURE, payload: error.message });
    }
};

export const fetchOrderById = (id) => async (dispatch) => {
    dispatch({ type: FETCH_ORDER_BY_ID_REQUEST });
    try {
        const response = await api.get(`/orders/${id}`);
        dispatch({ type: FETCH_ORDER_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_ORDER_BY_ID_FAILURE, payload: error.message });
    }
};
