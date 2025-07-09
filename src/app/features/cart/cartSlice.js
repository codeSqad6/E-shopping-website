// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
// import axios from "axios";

// const storedCart = JSON.parse(localStorage.getItem("cartList") || "[]");
// const initialState = { cartList: storedCart };

// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (_, { getState, rejectWithValue }) => {
//     const token = getState().auth.token;
//     try {
//       const res = await axios.get("http://test.smartsto0re.shop/api/Cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.data;
//     } catch (err) {
//       const msg = err.response?.data?.message || "فشل تحميل العربة";
//       toast.error(msg);
//       return rejectWithValue(msg);
//     }
//   }
// );
// export const addToCartAPI = createAsyncThunk(
//   "cart/addToCartAPI",
//   async ({ productId, Quantaty }, { getState, rejectWithValue }) => {
//     const token = getState().auth.token;
//     try {
//       const res = await axios.post(
//         "http://test.smartsto0re.shop/api/Cart/add-item",
//         { productId, Quantaty },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.success("✅ تمت الإضافة للعربة");
//       return res.data;
//     } catch (err) {
//       const msg = err.response?.data?.message || "فشل الإضافة للعربة";
//       toast.error(msg);
//       return rejectWithValue(msg);
//     }
//   }
// );
// // 🗑 deleteFromCartAPI: حذف منتج من عربة المستخدم عبر API
// export const deleteFromCartAPI = createAsyncThunk(
//   "cart/deleteFromCartAPI",
//   async ({ productId }, { getState, rejectWithValue }) => {
//     const token = getState().auth.token;
//     try {
//       const res = await axios.delete(
//         `http://test.smartsto0re.shop/api/Cart/remove-item/${productId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.info("🗑️ تم الحذف من العربة");
//       return res.data;
//     } catch (err) {
//       const msg = err.response?.data?.message || "فشل الحذف من العربة";
//       toast.error(msg);
//       return rejectWithValue(msg);
//     }
//   }
// );
// const cartSlice = createSlice({
//   name: "cart",
//   initialState: { cartList: [], status: "idle", error: null },
//   reducers: {
//     addToCart(state, action) {
//       const product = action.payload.product;
//       const Quantaty = action.payload.num;
//       const exist = state.cartList.find((item) => item.id === product.id);
//       if (exist) {
//         exist.Quantaty += Quantaty;
//       } else {
//         state.cartList.push({ ...product, Quantaty });
//       }
//     },
//     decreaseQuantaty(state, action) {
//       const item = action.payload;
//       const exist = state.cartList.find((i) => i.id === item.id);
//       if (!exist) return;
//       if (exist.Quantaty <= 1) {
//         state.cartList = state.cartList.filter((i) => i.id !== exist.id);
//       } else {
//         exist.Quantaty -= 1;
//       }
//     },
//     deleteProduct(state, action) {
//       const item = action.payload;
//       state.cartList = state.cartList.filter((i) => i.id !== item.id);
//     },
//     extraReducers: (builder) => {
//       builder
//         .addCase(fetchCart.pending, (state) => {
//           state.status = "loading";
//         })
//         .addCase(fetchCart.fulfilled, (state, action) => {
//           state.status = "succeeded";
//           state.cartList = action.payload;
//         })
//         .addCase(fetchCart.rejected, (state, action) => {
//           state.status = "failed";
//           state.error = action.payload;
//         })
//         .addCase(addToCartAPI.fulfilled, (state, action) => {
//           state.cartList = action.payload;
//         })
//         .addCase(deleteFromCartAPI.fulfilled, (state, action) => {
//           state.cartList = action.payload;
//         });
//     },
//   },
// });

// export const { addToCart, decreaseQuantaty, deleteProduct } = cartSlice.actions;

// export const cartMiddleware = (store) => (next) => (action) => {
//   if (action.type === "cart/addToCart") {
//     if (!store.getState().auth.isAuthenticated) {
//       toast.warning("🔒   Please LOGIN First To Add To The Card   ");
//       return; // تمنع الإضافة إذا لم يُسجل المستخدم دخوله
//     }
//   }
//   const result = next(action);
//   if (action.type.startsWith("cart/")) {
//     localStorage.setItem(
//       "cartList",
//       JSON.stringify(store.getState().cart.cartList)
//     );
//   }
//   return result;
// };

// export default cartSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

// 1. تعريف async thunks

const api = axios.create({
  baseURL: "http://test.smartsto0re.shop/api/",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("Cart");
      console.log("✅ fetchCart payload:", res.data.cartItems);
      return Array.isArray(res.data.cartItems) ? res.data.cartItems : [];
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch cart";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const addToCartAPI = createAsyncThunk(
  "cart/addToCartAPI",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.post("Cart/add-item", { productId, quantity });
      console.log(productId, quantity);

      toast.success("✅ Added to cart");
      return Array.isArray(res.data.cartItems) ? res.data.cartItems : [];
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add to cart";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const deleteFromCartAPI = createAsyncThunk(
  "cart/deleteFromCartAPI",
  async ({ cartItemId }, { rejectWithValue }) => {
    try {
      const res = await api.delete(`Cart/remove-item/${cartItemId}`);

      toast.info("🗑️ Removed from cart");
      return Array.isArray(res.data.cartItems) ? res.data.cartItems : [];
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete from cart";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const updateCartItemAPI = createAsyncThunk(
  "cart/updateCartItemAPI",
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.put(`Cart/update-item/${cartItemId}`, {
        quantity,
      });
      console.log(cartItemId, quantity);

      toast.info("✅ Quantity updated");
      return res.data.cartItems;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update quantity";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 2. تهيئة المقطع

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartList: [], status: "idle", error: null },
  reducers: {
    // // إذا أردت إبقاء نسخة التخزين المحلي
    // addToCart(state, action) {
    //   const product = action.payload.product;
    //   const Quantaty = action.payload.num;
    //   const found = state.cartList.find((i) => i.id === product.id);
    //   if (found) found.Quantaty += Quantaty;
    //   else state.cartList.push({ ...product, Quantaty });
    // },
    // decreaseQty(state, action) {
    //   const item = action.payload;
    //   const found = state.cartList.find((i) => i.id === item.id);
    //   if (!found) return;
    //   if (found.Quantaty <= 1)
    //     state.cartList = state.cartList.filter((i) => i.id !== item.id);
    //   else found.Quantaty -= 1;
    // },
    // deleteProduct(state, action) {
    //   const item = action.payload;
    //   state.cartList = state.cartList.filter((i) => i.id !== item.id);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (s) => {
        s.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.cartList = a.payload;
      })
      .addCase(fetchCart.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload;
      })
      .addCase(addToCartAPI.fulfilled, (s, a) => {
        console.log("✅ addToCartAPI payload:", a.payload);

        if (Array.isArray(a.payload)) {
          s.cartList = a.payload;
        } else {
          console.warn("🔍 أبواب الرد غير مصفوفة:", a.payload);
        }
      })
      .addCase(deleteFromCartAPI.fulfilled, (state, action) => {
        const deletedItemId = action.meta.arg.cartItemId;

        // حذف العنصر يدويًا بناءً على ID
        state.cartList = state.cartList.filter(
          (item) => item.id !== deletedItemId
        );

        console.log("✅ Removed item from cartList in state:", deletedItemId);
      });
  },
});

export const { addToCart, decreaseQty, deleteProduct } = cartSlice.actions;

// 3. ضبط الميدل وير

export const cartMiddleware = (store) => (next) => (action) => {
  if (action.type === "cart/addToCart") {
    if (!store.getState().auth.isAuthenticated) {
      toast.warning("🔒 Please login first");
      return;
    }
    // بدّل dispatch محلي إلى API
    const { product, quantity } = action.payload;
    return store.dispatch(addToCartAPI({ productId: product.id, quantity }));
  }
  return next(action);
};

export default cartSlice.reducer;
