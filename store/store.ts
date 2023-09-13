import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import { apiSlice } from "./apiSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    devTools: true
});

export default store