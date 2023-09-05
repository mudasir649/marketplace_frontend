import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "Authentication Slice",
    initialState: {
        user: ""
    },
    reducers: {
        getUser: (state, actions) => {

        }
    }
});

const { reducer } = authSlice;

export default reducer;