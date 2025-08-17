import {createSlice} from '@reduxjs/toolkit'

const inititalState = [
    {img: '/partners/lexus.png', alt: 'lexus'},
    {img: '/partners/lexus.png', alt: 'lexus'},
    {img: '/partners/lexus.png', alt: 'lexus'},
    {img: '/partners/lexus.png', alt: 'lexus'},
    {img: '/partners/lexus.png', alt: 'lexus'},
    {img: '/partners/lexus.png', alt: 'lexus'},
    {img: '/partners/lexus.png', alt: 'lexus'},
    {img: '/partners/lexus.png', alt: 'lexus'},
]

const partnersSlice = createSlice({
    name: 'partners',
    initialState: inititalState,
    reducers: { 
        getPrartners: (state, action) => {
        },
    },
})

export const {reducer} = partnersSlice;