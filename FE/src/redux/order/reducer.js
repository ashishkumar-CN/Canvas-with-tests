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

const initialState = {
    orders: [],
    order: null,
    loading: false,
    error: null
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
        case FETCH_USER_ORDERS_REQUEST:
        case FETCH_ORDER_BY_ID_REQUEST:
            return { ...state, loading: true, error: null };
        case CREATE_ORDER_SUCCESS:
            return { ...state, loading: false, order: action.payload, error: null };
        case FETCH_USER_ORDERS_SUCCESS:
            return { ...state, loading: false, orders: action.payload, error: null };
        case FETCH_ORDER_BY_ID_SUCCESS:
            return { ...state, loading: false, order: action.payload, error: null };
        case CREATE_ORDER_FAILURE:
        case FETCH_USER_ORDERS_FAILURE:
        case FETCH_ORDER_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
