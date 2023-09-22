import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    refresh: false,
    filterData: [],
    showShare: false,
    showSellNow: false,
    productId: '',
    showRepairNow: false,
    showDeleteAd: false
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
        },
        setShowSellNow: (state, actions) => {
            state.showSellNow = actions.payload
        },
        setShowRepairNow: (state, actions) => {
            state.showRepairNow = actions.payload
        },
        setShowDeleteAd: (state, actions) => {
            state.showDeleteAd = actions.payload
        }
    }
});

export const { refreshPage, setFilterData, setShowShare, setProductId, setShowSellNow, setShowRepairNow, setShowDeleteAd } = appSlice.actions;

export default appSlice.reducer;