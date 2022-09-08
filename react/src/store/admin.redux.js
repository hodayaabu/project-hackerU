import { createSlice } from "@reduxjs/toolkit";


const initialAdminState = {
    isAdmin: false
};

const adminSlice = createSlice({
    name: "admin",
    initialState: initialAdminState,
    reducers: {
        admin(state) {
            state.isAdmin = true
        },
        noAdmin(state) {
            state.isAdmin = false
        }
    },
});

export const adminActions = adminSlice.actions;
export default adminSlice.reducer;