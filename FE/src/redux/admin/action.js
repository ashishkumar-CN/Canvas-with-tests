import api from "@/config/api";
import {
    FETCH_ADMIN_ORDERS_REQUEST,
    FETCH_ADMIN_ORDERS_SUCCESS,
    FETCH_ADMIN_ORDERS_FAILURE,
    UPDATE_ADMIN_ORDER_STATUS_REQUEST,
    UPDATE_ADMIN_ORDER_STATUS_SUCCESS,
    UPDATE_ADMIN_ORDER_STATUS_FAILURE,
    FETCH_ADMIN_CARTS_REQUEST,
    FETCH_ADMIN_CARTS_SUCCESS,
    FETCH_ADMIN_CARTS_FAILURE
} from './actionType';

export const fetchAdminOrders = () => async (dispatch) => {
    dispatch({ type: FETCH_ADMIN_ORDERS_REQUEST });
    try {
        const response = await api.get('/admin/orders');
        dispatch({ type: FETCH_ADMIN_ORDERS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_ADMIN_ORDERS_FAILURE, payload: error.message });
    }
};

export const updateAdminOrderStatus = (orderId, status) => async (dispatch) => {
    dispatch({ type: UPDATE_ADMIN_ORDER_STATUS_REQUEST });
    try {
        const response = await api.put(`/admin/orders/${orderId}/status?status=${status}`);
        dispatch({ type: UPDATE_ADMIN_ORDER_STATUS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_ADMIN_ORDER_STATUS_FAILURE, payload: error.message });
    }
};

export const fetchAdminCarts = () => async (dispatch) => {
    dispatch({ type: FETCH_ADMIN_CARTS_REQUEST });
    try {
        const response = await api.get('/admin/carts');
        dispatch({ type: FETCH_ADMIN_CARTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_ADMIN_CARTS_FAILURE, payload: error.message });
    }
};
