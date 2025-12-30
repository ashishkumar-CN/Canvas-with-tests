import api from "@/config/api";
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCT_BY_ID_REQUEST,
    FETCH_PRODUCT_BY_ID_SUCCESS,
    FETCH_PRODUCT_BY_ID_FAILURE
} from "./actionType";

export const fetchProducts = (params) => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        const { category, search, page, limit } = params || {};
        const queryParams = new URLSearchParams();
        if (category) queryParams.append('category', category);
        if (search) queryParams.append('search', search);
        if (page) queryParams.append('page', page);
        if (limit) queryParams.append('limit', limit);

        const response = await api.get(`/products?${queryParams.toString()}`);
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
};

export const fetchProductById = (id) => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCT_BY_ID_REQUEST });
    try {
        const response = await api.get(`/products/${id}`);
        dispatch({ type: FETCH_PRODUCT_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCT_BY_ID_FAILURE, payload: error.message });
    }
};
