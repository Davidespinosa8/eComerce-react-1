import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user-slice';
import productSlice from './slices/product-slice';
import cartSlice, { setCartFromLocalStorage } from './slices/cart-slice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        products: productSlice,
        cart: cartSlice
    },
});

// Use subscribe to listen for changes in the store
store.subscribe(() => {
    const state = store.getState();
    console.log(state);
    // localStorage.setItem("localCart", JSON.stringify(state.cart));
    if (state.cart.length) {
        localStorage.setItem("localCart", JSON.stringify(state.cart));
    } else {
        localStorage.removeItem("localCart");
    }
});

const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem("localCart");
    if (storedCart) {
        const parsedCart = JSON.parse(storedCart);

        store.dispatch(setCartFromLocalStorage(parsedCart));
    }
};
loadCartFromLocalStorage();