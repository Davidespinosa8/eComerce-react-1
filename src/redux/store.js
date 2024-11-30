import { configureStore } from '@reduxjs/toolkit';
import userSlice, { setFavoriteFromLocalStorage, setUserLogged } from './slices/user-slice';
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
    // console.log('store.js - subscribe - state', state);

    if (state.cart.length) {
        localStorage.setItem("localCart", JSON.stringify(state.cart));
    } else {
        localStorage.removeItem("localCart");
    }

    if (state.user.userLogged) {
        localStorage.setItem("userlogged", JSON.stringify(state.user));
    } else {
        localStorage.removeItem("userlogged");
    }
});

const loadFromLocalStorage = () => {
    const storedCart = localStorage.getItem("localCart");
    // const storedUser = localStorage.getItem("userlogged");

    if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        store.dispatch(setCartFromLocalStorage(parsedCart));
    }
    
    const storedUser = localStorage.getItem("userlogged");
    // console.log('store.js - loadFromLocalStorage - storedUser', storedUser);
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // console.log('store.js - loadFromLocalStorage - parsedUser', parsedUser);
        store.dispatch(setUserLogged(parsedUser.userLogged));
        store.dispatch(setFavoriteFromLocalStorage(parsedUser.favorites));
    }
};
loadFromLocalStorage();