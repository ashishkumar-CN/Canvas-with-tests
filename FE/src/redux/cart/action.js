import api from "@/config/api";
import {
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILURE,
  ADD_TO_CART_LOCAL,
  REMOVE_FROM_CART_LOCAL,
  UPDATE_QUANTITY_LOCAL,
  CLEAR_CART_LOCAL
} from './actiontype';


// Async Actions
export const fetchCart = () => async (dispatch) => {
  dispatch({ type: FETCH_CART_REQUEST });
  try {
    // userId is not needed in URL if token is present, but backend requires it.
    // We assume backend handles security via token, but path still needs ID.
    // For now, let's keep using getUserId() helper or update backend to use Principal.
    // The previous code had getUserId(). Let's keep it but use api instance.
    const userStr = localStorage.getItem('user');
    const userId = userStr ? JSON.parse(userStr).id : null;

    if (!userId) {
      console.warn("User not logged in, skipping cart fetch");
      dispatch({ type: FETCH_CART_FAILURE, payload: "User not logged in" });
      return;
    }

    const response = await api.get(`/cart/${userId}`);
    const cartItems = response.data.map(item => ({
      id: item.id.toString(),
      name: item.product.name,
      price: item.product.price - (item.product.discount || 0),
      originalPrice: item.product.discount ? item.product.price : undefined,
      image: item.product.imageUrl,
      quantity: item.quantity,
      category: item.product.category || 'General'
    }));
    dispatch({ type: FETCH_CART_SUCCESS, payload: cartItems });
  } catch (error) {
    dispatch({ type: FETCH_CART_FAILURE, payload: error.message });
  }
};

export const addToCart = (productId, quantity = 1) => async (dispatch) => {
  dispatch({ type: ADD_TO_CART_REQUEST });
  try {
    const userStr = localStorage.getItem('user');
    const userId = userStr ? JSON.parse(userStr).id : null;

    if (!userId) {
      throw new Error("Please login to add items to cart");
    }

    const response = await api.post(`/cart/${userId}`, {
      productId,
      quantity
    });
    const item = response.data;
    const cartItem = {
      id: item.id.toString(),
      name: item.product.name,
      price: item.product.price - (item.product.discount || 0),
      originalPrice: item.product.discount ? item.product.price : undefined,
      image: item.product.imageUrl,
      quantity: item.quantity,
      category: item.product.category || 'General'
    };
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: cartItem });
  } catch (error) {
    dispatch({ type: ADD_TO_CART_FAILURE, payload: error.message });
  }
};

export const updateCartItem = (cartItemId, quantity) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });
  try {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    const response = await api.put(`/cart/${userId}/${cartItemId}`, {
      quantity
    });
    const item = response.data;
    const cartItem = {
      id: item.id.toString(),
      name: item.product.name,
      price: item.product.price - (item.product.discount || 0),
      originalPrice: item.product.discount ? item.product.price : undefined,
      image: item.product.imageUrl,
      quantity: item.quantity,
      category: item.product.category || 'General'
    };
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: { id: cartItemId.toString(), cartItem } });
  } catch (error) {
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
  }
};

export const removeCartItem = (cartItemId) => async (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM_REQUEST });
  try {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    await api.delete(`/cart/${userId}/${cartItemId}`);
    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId.toString() });
  } catch (error) {
    dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
  }
};

export const clearCart = () => async (dispatch) => {
  dispatch({ type: CLEAR_CART_REQUEST });
  try {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    await api.delete(`/cart/${userId}`);
    dispatch({ type: CLEAR_CART_SUCCESS });
  } catch (error) {
    dispatch({ type: CLEAR_CART_FAILURE, payload: error.message });
  }
};

// Local Actions (for immediate UI updates)
export const addToCartLocal = (item) => ({
  type: ADD_TO_CART_LOCAL,
  payload: item
});

export const removeFromCartLocal = (id) => ({
  type: REMOVE_FROM_CART_LOCAL,
  payload: id
});

export const updateQuantityLocal = (id, quantity) => ({
  type: UPDATE_QUANTITY_LOCAL,
  payload: { id, quantity }
});

export const clearCartLocal = () => ({
  type: CLEAR_CART_LOCAL
});
