import api from "@/config/api";
import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE
} from "./actionType";

export const fetchProfile = () => async (dispatch) => {
    dispatch({ type: FETCH_PROFILE_REQUEST });
    try {
        const response = await api.get('/profile');
        dispatch({ type: FETCH_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_PROFILE_FAILURE, payload: error.message });
    }
};

export const updateProfile = (profileData) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    try {
        const response = await api.put('/profile', profileData);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message });
    }
};
