import { configureStore } from '@reduxjs/toolkit';
import userSlice, { setUserLogged } from './slices/user-slice';
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
    if (state.user) {
        localStorage.setItem("userlogged", JSON.stringify(state.user));
    } else {
        localStorage.removeItem("userlogged");
    }
});

const loadFromLocalStorage = () => {
    const storedCart = localStorage.getItem("localCart");
    if (storedCart) {
        const parsedCart = JSON.parse(storedCart);

        store.dispatch(setCartFromLocalStorage(parsedCart));
    }
    const storedUser = localStorage.getItem("userlogged");
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log('store', parsedUser)
        store.dispatch(setUserLogged(parsedUser));
    }
};
loadFromLocalStorage();