import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import appReducer from './appSlice';
import { apiSlice } from "./apiSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    devTools: true
});

export default store