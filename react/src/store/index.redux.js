import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.redux"
import adminReducer from "./admin.redux";


const store = configureStore({
    reducer: { auth: authReducer, admin: adminReducer }
});

export default store;