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

const initialState = {
    orders: [],
    carts: [],
    loading: false,
    error: null
};

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADMIN_ORDERS_REQUEST:
        case UPDATE_ADMIN_ORDER_STATUS_REQUEST:
        case FETCH_ADMIN_CARTS_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_ADMIN_ORDERS_SUCCESS:
            return { ...state, loading: false, orders: action.payload };

        case UPDATE_ADMIN_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ? action.payload : order
                )
            };

        case FETCH_ADMIN_CARTS_SUCCESS:
            return { ...state, loading: false, carts: action.payload };

        case FETCH_ADMIN_ORDERS_FAILURE:
        case UPDATE_ADMIN_ORDER_STATUS_FAILURE:
        case FETCH_ADMIN_CARTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
