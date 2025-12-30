import api from "@/config/api";
import {
  FETCH_ADDRESSES_REQUEST,
  FETCH_ADDRESSES_SUCCESS,
  FETCH_ADDRESSES_FAILURE,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE
} from './actiontype';

// Async Actions
export const fetchAddresses = () => async (dispatch) => {
  dispatch({ type: FETCH_ADDRESSES_REQUEST });
  try {
    const response = await api.get('/addresses');
    dispatch({ type: FETCH_ADDRESSES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_ADDRESSES_FAILURE, payload: error.message });
  }
};

export const addAddress = (addressData) => async (dispatch) => {
  dispatch({ type: ADD_ADDRESS_REQUEST });
  try {
    const response = await api.post('/addresses', addressData);
    dispatch({ type: ADD_ADDRESS_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: ADD_ADDRESS_FAILURE, payload: error.message });
  }
};

export const updateAddress = (id, addressData) => async (dispatch) => {
  dispatch({ type: UPDATE_ADDRESS_REQUEST });
  try {
    const response = await api.put(`/addresses/${id}`, addressData);
    dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: { id, address: response.data } });
  } catch (error) {
    dispatch({ type: UPDATE_ADDRESS_FAILURE, payload: error.message });
  }
};

export const deleteAddress = (id) => async (dispatch) => {
  dispatch({ type: DELETE_ADDRESS_REQUEST });
  try {
    await api.delete(`/addresses/${id}`);
    dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_ADDRESS_FAILURE, payload: error.message });
  }
};
