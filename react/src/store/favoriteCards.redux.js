import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoriteProducts: localStorage.getItem('favoriteProducts') ? JSON.parse(localStorage.getItem('favoriteProducts')) : []
}

const favoriteCardsSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites(state, action) {
            state.favoriteProducts.push(action.payload);
            localStorage.setItem('favoriteProducts', JSON.stringify(state.favoriteProducts));
        },
    },
});

export const { addToFavorites } = favoriteCardsSlice.actions;
export default favoriteCardsSlice.reducer;