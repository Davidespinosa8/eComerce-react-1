import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartFromLocalStorage: (state, action) => {
            return [...state, ...action.payload];
        },
        checkoutCart: (state, action) => {
            return [];
        },
        addToCart: (state, action) => {
            return [...state, action.payload];
        },
        removeFromCart: (state, action) => {
            return state.filter((item) => action.payload !== item.id);
        },
        increaseQty: (state, action) => {
            return state.map((item) =>
                item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
            );
        },
        decreaseQty: (state, action) => {
            return state.map((item) =>
                item.id === action.payload ? { ...item, qty: item.qty - 1 } : item
            );
        },
    },
});

export const {
    setCartFromLocalStorage,
    checkoutCart,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
} = CartSlice.actions;
export default CartSlice.reducer;