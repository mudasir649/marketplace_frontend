import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null
}

const authSlice = createSlice({
    name: "Authentication Slice",
    initialState,
    reducers: {
        setCredentials: (state, actions) => {
            state.userInfo = actions.payload;
            localStorage.setItem('userInfo', JSON.stringify(actions.payload))
        },
    }
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;