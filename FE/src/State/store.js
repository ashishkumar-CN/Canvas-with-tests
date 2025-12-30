import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import cartReducer from "@/redux/cart/reducer";
import addressReducer from "@/redux/address/reducer";
import wishlistReducer from "@/redux/wishlist/reducer";
import { productReducer } from "@/redux/product/reducer";
import { categoryReducer } from "@/redux/category/reducer";
import { orderReducer } from "@/redux/order/reducer";
import { profileReducer } from "@/redux/profile/reducer";

import { adminReducer } from "@/redux/admin/reducer";

const rootReducers = combineReducers({
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer,
    order: orderReducer,
    address: addressReducer,
    wishlist: wishlistReducer,
    profile: profileReducer,
    admin: adminReducer
});

// Use the corrected name here as well
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));