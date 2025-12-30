import api from "@/config/api";
import {
    LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
    REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS
} from "./ActionType";

export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const response = await api.post(`/auth/register`, userData);
        // Extract 'user' from your Spring Boot AuthResponse if needed, or handle token
        const data = response.data;
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
        }
        dispatch({ type: REGISTER_SUCCESS, payload: data.user || data });
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.response?.data?.message || "Registration Failed" });
    }
};

export const login = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await api.post(`/auth/login`, userData);
        const data = response.data;
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data.user || data });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.message || "Invalid Credentials" });
    }
};