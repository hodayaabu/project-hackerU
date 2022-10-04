import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.redux"
import adminReducer from "./admin.redux";
import favoriteCardsSlice from "./favoriteCards.redux";


const store = configureStore({
    reducer: { auth: authReducer, admin: adminReducer, favorites: favoriteCardsSlice }
});

export default store;