// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer, { cartMiddleware } from "./cartSlice";
// import authReducer from "./authSlice";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     cart: cartReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(cartMiddleware),
// });

// export default store;
// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./features/auth/authSlice";
// import cartReducer, { cartMiddleware } from "./features/cart/cartSlice";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     cart: cartReducer,
//   },
//   middleware: (getDefault) => getDefault().concat(cartMiddleware),
// });

// export default store;
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import authReducer, { reset } from "./features/auth/authSlice";
// import cartReducer, { cartMiddleware } from "./features/cart/cartSlice";

// const appReducer = combineReducers({
//   auth: authReducer,
//   cart: cartReducer,
// });

// const rootReducer = (state, action) => {
//   if (action.type === "auth/reset") {
//     return appReducer(undefined, { type: undefined });
//   }
//   return appReducer(state, action);
// };

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefault) => getDefault().concat(cartMiddleware),
// });
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer, { reset } from "./features/auth/authSlice";
import cartReducer, { cartMiddleware } from "./features/cart/cartSlice";

const appReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const rootReducer = (state, action) => {
  if (action.type === reset.type) {
    // عند reset يتم إعادة تهيئة الحالة
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) => getDefault().concat(cartMiddleware),
});
