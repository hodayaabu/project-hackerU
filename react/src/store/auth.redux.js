import { createSlice } from "@reduxjs/toolkit";


const initialAuthState = {
    loggedIn: false
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.loggedIn = true
        },
        logout(state) {
            state.loggedIn = false
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;