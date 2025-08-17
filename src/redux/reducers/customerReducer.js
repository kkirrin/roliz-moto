import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: -1,
    authStatus: false,
    type: "гость",
    username: 'Гость',
    fullname: '',
    name: '',
    address: '',
    tel: '',
    jwt: '',
    orders: [],
    saveCart: [],
}

 export const customerSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        saveCart: (state, action) => {
            if(Array.isArray(action.payload)) {
                state.saveCart.push(...action.payload)
            }
        },
        exit: (state, action) => {
                state.id = -1
                state.authStatus = false;
                state.type = "гость"
                state.username = 'Гость'
                state.fullname = ''
                state.name = ''
                state.tel = ''
                state.jwt = ''
                state.orders = []
                state.saveCart = []
                state.address = ''
        },
        auth: (state, action) => {
            if(action.payload) {
                state.authStatus = true;
                state.id = (action.payload.id) ? action.payload.id : false,
                state.type = (action.payload.typeCustomer) ? 'Оптовый покупатель' : 'Розничный покупатель';
                state.tel = (action.payload.phone)? action.payload.phone : '';
                state.fullname = (action.payload.fullname) ? action.payload.fullname : '';
                state.name = (action.payload.name) ? action.payload.name : '';
                state.address =  (action.payload.address) ? action.payload.address : '';
                state.username = (action.payload.username) ? action.payload.username : '';
                state.orders = (action.payload?.Ordres) ? [...action.payload.Ordres] : [];
                state.jwt = action.payload.JWT;
            }
        }
    }
})

export const {reducer, actions} = customerSlice;
