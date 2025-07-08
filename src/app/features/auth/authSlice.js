// // // app/features/auth/authSlice.js
// // import { createSlice } from "@reduxjs/toolkit";
// // const tokenFromStorage = localStorage.getItem("token");

// // const initialState = {
// //   token: tokenFromStorage,
// //   isAuthenticated: Boolean(tokenFromStorage),
// // };

// // const authSlice = createSlice({
// //   name: "auth",
// //   initialState,
// //   reducers: {
// //     loginSuccess(state, action) {
// //       state.token = action.payload;
// //       state.isAuthenticated = true;
// //       localStorage.setItem("token", action.payload);
// //     },
// //     logout(state) {
// //       state.token = null;
// //       state.isAuthenticated = false;
// //       localStorage.removeItem("token");
// //     },
// //   },
// // });

// // export const { loginSuccess, logout } = authSlice.actions;
// // export default authSlice.reducer;
// // authSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialAuth = {
//   isAuthenticated: Boolean(localStorage.getItem("token")),
//   token: localStorage.getItem("token") || null,
//   user: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState: initialAuth,
//   reducers: {
//     loginSuccess(state, action) {
//       state.isAuthenticated = true;
//       state.token = action.payload.token;
//       localStorage.setItem("token", action.payload.token);
//     },
//     logout(state) {
//       state.isAuthenticated = false;
//       state.token = null;
//       localStorage.removeItem("token");
//     },
//   },
// });

// export const { loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;
// app/features/auth/authSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   token: localStorage.getItem("token"),
//   isAuthenticated: Boolean(localStorage.getItem("token")),
// };
// console.log("dsdsdsd", initialState.token);

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginSuccess(state, action) {
//       state.token = action.payload;
//       state.isAuthenticated = true;
//       localStorage.setItem("token", action.payload);
//     },
//     logout(state) {
//       state.token = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem("token");
//     },
//     reset: () => initialState, // ← هنا الإجراء لإعادة التهيئة
//   },
// });

// export const { loginSuccess, logout, reset } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    reset(state) {
      return initialState;
    },
  },
});

export const { loginSuccess, logout, reset } = authSlice.actions;
export default authSlice.reducer;
