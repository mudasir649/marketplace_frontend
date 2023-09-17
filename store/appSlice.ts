import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    refresh: false,
    filterData: []
}


const appSlice = createSlice({
    name: "Aapp Slice",
    initialState,
    reducers: {
        refreshPage: (state, actions) => {
            state.refresh = actions.payload
        },
        setFilterData: (state, actions) => {
            state.filterData = actions.payload;
        }
    }
});

export const { refreshPage, setFilterData } = appSlice.actions;

export default appSlice.reducer;