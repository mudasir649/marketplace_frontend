import { createSlice } from "@reduxjs/toolkit";


const getProductInitialState = () => {
    const productData = typeof window !== 'undefined' ? localStorage.getItem('productsData') : null;
    const productsData = productData ? JSON.parse(productData) : null
    return productsData;
}


const getChatRoomData = () => {
    const chatRoomData = typeof window !== 'undefined' ? localStorage.getItem('roomsData') : null;
    const chatRoom = chatRoomData ? JSON.parse(chatRoomData) : null
    return chatRoom;
}


const initialState = {
    refresh: 0,
    filterData: [],
    showShare: false,
    showSellNow: false,
    productId: '',
    productUserId: '',
    showRepairNow: false,
    showDeleteAd: false,
    productData: null,
    productsCount: 0,
    roomsData: getChatRoomData() !== null ? getChatRoomData() : null,
    // productData: getProductInitialState() !== null ? getProductInitialState() : null,
    // productsCount: getProductInitialCount() !== null ? getProductInitialCount() : 0,
    page: 1,
    sortBy: '',
    type: '',
    title:'',
    address: ''
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
        // setProductData: (state, actions) => {
        //     state.productData = actions.payload;
        //     localStorage.setItem('productsData', JSON.stringify(actions.payload));
        // },
        // setProductsCount: (state, actions) => {
        //     state.productsCount = actions.payload;
        //     localStorage.setItem('productsCount', actions.payload);
        // },
        setProductUserId: (state, actions) => {
            state.productUserId = actions.payload;
        },
        setProductData: (state, actions) => {
            state.productData = actions.payload;
        },
        setProductsCount: (state, actions) => {
            state.productsCount = actions.payload;
        },
        setPage: (state, actions) => {
            state.page = actions.payload
        },
        setSortBy: (state, actions) => {
            state.sortBy = actions.payload
        },
        setType: (state, actions) => {
            state.type = actions.payload;
        },
        setReduxTitle: (state, actions) => {
            state.title = actions.payload
        },
        setReduxAddress: (state, actions) => {
            state.address = actions.payload;
        },
        setRoomsData: (state, actions) => {
            state.roomsData = actions.payload;
            localStorage.setItem('roomsData', JSON.stringify(actions.payload));
        }
    }
});

export const { refreshPage, setFilterData, 
                setShowShare, setProductId, 
                setShowSellNow, setShowRepairNow, 
                setShowDeleteAd, setPage,
                setProductData, setProductsCount, 
                setSortBy, setType,
                setReduxTitle, setReduxAddress, 
                setProductUserId, setRoomsData } = appSlice.actions;

export default appSlice.reducer;