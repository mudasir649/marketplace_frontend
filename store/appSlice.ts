import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    refresh: false,
    filterData: [],
    showShare: false,
    productId: ''
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
        },
        setShowShare: (state, actions) => {
            state.showShare = actions.payload;
        },
        setProductId: (state, actions) => {
            state.productId = actions.payload
        }
    }
});

export const { refreshPage, setFilterData, setShowShare, setProductId } = appSlice.actions;

export default appSlice.reducer;