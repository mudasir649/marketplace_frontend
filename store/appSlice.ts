import { createSlice } from "@reduxjs/toolkit";


const getProductInitialState = () => {
    const productData = typeof window !== 'undefined' ? localStorage.getItem('productsData') : null;
    const productsData = productData ? JSON.parse(productData) : null
    return productsData;
}

const getProductCountsInitialState = () => {
    const productDataCount = typeof window !== 'undefined' ? localStorage.getItem('productsCount') : null;
    const productsCount = productDataCount ? productDataCount : null;
    return productsCount;
}

const getProdIdInitialState = (): string[] => {
    const prodIdData = typeof window !== 'undefined' ? localStorage.getItem('prodId') : null;
    return prodIdData ? JSON.parse(prodIdData) : [];
};

const getChatRoomData = () => {
    const chatRoomData = typeof window !== 'undefined' ? localStorage.getItem('roomsData') : null;
    const chatRoom = chatRoomData ? JSON.parse(chatRoomData) : null
    return chatRoom;
}


interface InitialStateInterface {
    refresh: number;
    filterData: string[]; // Change this to match your data type.
    showShare: boolean;
    showSellNow: boolean;
    productId: string;
    productUserId: string;
    showRepairNow: boolean;
    showDeleteAd: boolean;
    productData: any | null;
    productsCount: any | null;
    roomsData: any | null;
    page: number;
    sortBy: string;
    type: string;
    title: string;
    address: string;
    language: string;
    showContact: boolean;
    condition: string | null;
    brand: string | null;
    minPrice: any | null;
    maxPrice: any | null;
    prodId: string[];
    closeAll: Boolean
}


const initialState: InitialStateInterface = {
    refresh: 0,
    filterData: [],
    showShare: false,
    showSellNow: false,
    productId: '',
    productUserId: '',
    showRepairNow: false,
    showDeleteAd: false,
    productData: getProductInitialState() !== null ? getProductInitialState() : null,
    productsCount: getProductCountsInitialState() !== null ? getProductCountsInitialState() : null,
    roomsData: getChatRoomData() !== null ? getChatRoomData() : null,
    page: 1,
    sortBy: '',
    type: '',
    title:'',
    address: '',
    language: 'en',
    showContact: false,
    condition: null || '',
    brand: null || '',
    minPrice: null || '',
    maxPrice: null || '',
    prodId: getProdIdInitialState(),
    closeAll: false
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
        setProductUserId: (state, actions) => {
            state.productUserId = actions.payload;
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
        },
        setLanguage: (state, actions) => {
            state.language = actions.payload;
        },
        setShowContact: (state, actions) => {
            state.showContact = actions.payload;
        },
        setCondition: (state, actions) => {
            state.condition = actions.payload;
        },
        setBrand: (state, actions) => {
            state.brand = actions.payload;
        },
        setMaxPrice: (state, actions) => {
            state.maxPrice = actions.payload;
        },
        setMinPrice: (state, actions) => {
            state.minPrice = actions.payload;
        },
        setProdId: (state, actions) => {
            state.prodId = actions.payload;
            localStorage.setItem('prodId', JSON.stringify(state.prodId));
        },
        setCloseAll: (state, actions) => {
            state.closeAll = actions.payload;
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
                setProductUserId, setRoomsData, 
                setLanguage, setShowContact, 
                setCondition, setBrand, 
                setMinPrice, setMaxPrice, setProdId, setCloseAll } = appSlice.actions;

export default appSlice.reducer;