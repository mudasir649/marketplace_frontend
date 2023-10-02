import { createSlice } from "@reduxjs/toolkit";


const getProductInitialState = () => {
    const productData = typeof window !== 'undefined' ? localStorage.getItem('productsData') : null;
    const productsData = productData ? JSON.parse(productData) : null
    return productsData;
}


const getProductInitialCount = () => {
    const productsCount = typeof window !== 'undefined' ? localStorage.getItem('productsCount') : null;
    return productsCount;
}


const initialState = {
    refresh: false,
    filterData: [],
    showShare: false,
    showSellNow: false,
    productId: '',
    showRepairNow: false,
    showDeleteAd: false,
    productData: getProductInitialState() !== null ? getProductInitialState() : null,
    productsCount: getProductInitialCount() !== null ? getProductInitialCount() : 0,
    page: 1
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
        },
        setProductData: (state, actions) => {
            state.productData = actions.payload;
            localStorage.setItem('productsData', JSON.stringify(actions.payload));
        },
        setProductsCount: (state, actions) => {
            state.productsCount = actions.payload;
            localStorage.setItem('productsCount', actions.payload);
        },
        setPage: (state, actions) => {
            state.page = actions.payload
        }
    }
});

export const { refreshPage, setFilterData, 
                setShowShare, setProductId, 
                setShowSellNow, setShowRepairNow, 
                setShowDeleteAd, setPage,
                setProductData, setProductsCount } = appSlice.actions;

export default appSlice.reducer;