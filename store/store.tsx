import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
const reducers = {
    auth: authReducer
}

const store = configureStore({
    reducer: reducers,
    devTools: true
});

export default store