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

        // Map backend products to frontend format
        const mappedProducts = (response.data || []).map(p => ({
            ...p,
            id: p.id.toString(),
            image: p.imageUrl || p.image,
            category: typeof p.category === 'object' ? p.category.name : (p.category || 'General'),
            price: p.price || 0,
            rating: p.rating || 4.5
        }));

        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: mappedProducts });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
};

export const fetchProductById = (id) => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCT_BY_ID_REQUEST });
    try {
        const response = await api.get(`/products/${id}`);
        const p = response.data;
        const mappedProduct = {
            ...p,
            id: p.id.toString(),
            image: p.imageUrl || p.image,
            category: typeof p.category === 'object' ? p.category.name : (p.category || 'General'),
            price: p.price || 0,
            rating: p.rating || 4.5
        };
        dispatch({ type: FETCH_PRODUCT_BY_ID_SUCCESS, payload: mappedProduct });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCT_BY_ID_FAILURE, payload: error.message });
    }
};
