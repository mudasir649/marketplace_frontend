import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
    const userInfo = typeof window !== 'undefined' ? localStorage.getItem('userInfo') : null;

    return {
        userInfo: userInfo ? JSON.parse(userInfo) : null
    }
}

const initialState = {
    userInfo: getInitialState() !== null ? getInitialState() : null
}

const authSlice = createSlice({
    name: "Authentication Slice",
    initialState,
    reducers: {
        setCredentials: (state, actions) => {
            state.userInfo = actions.payload;
            localStorage.setItem('userInfo', JSON.stringify(actions.payload))
        },
        logout: (state, actions) => {
            state.userInfo = actions.payload,
            localStorage.removeItem('userInfo');
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;