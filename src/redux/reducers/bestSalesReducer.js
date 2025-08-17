import {createSlice} from "@reduxjs/toolkit";

const initialState = [
    {
        id: 0,
        id1c: "1234567890123456",
        category: [1,4,6],
        image: ['/testProduct.png'],
        title: "Е ае",
        description: "Описание", //Сейчас нету, так на будущее
        stock: 200, 
        storeplace: "Владивосток",
        attributes: {
            weight: {
                name: 'Вес',
                type: 'weight',
                value: 100,
            },
            unitm: {
                name: 'Единицы измерения',
                type: 'unitm',
                value: 'шт',
            },
            manufacturer: {
                name: 'Производитель',
                type:'manufacturer',
                value: 'Meritor',
            },
            country: {
                name: 'Страна',
                type: 'country',
                value: 'США',
            },
            stockstore: {
                name: 'Склад',
                type:'stockstore',
                value: 'Владивосток',
            }
        },
        quantitySales: 0,
        price: 23240,
    },
    {
        id: 1,
        id1c: "1234567890123456",
        category: [1,4,6],
        image: ['/testProduct.png'],
        title: "Вал среднего редуктора вход (без масл. насоса) RCW RD20-145, TDA A3297U1347 1",
        description: "Описание", //Сейчас нету, так на будущее
        stock: 200, 
        storeplace: "Владивосток",
        attributes: {
            weight: {
                name: 'Вес',
                type: 'weight',
                value: 100,
            },
            unitm: {
                name: 'Единицы измерения',
                type: 'unitm',
                value: 'шт',
            },
            manufacturer: {
                name: 'Производитель',
                type:'manufacturer',
                value: 'Meritor',
            },
            country: {
                name: 'Страна',
                type: 'country',
                value: 'США',
            },
            stockstore: {
                name: 'Склад',
                type:'stockstore',
                value: 'Владивосток',
            }
        },
        quantitySales: 0,
        price: 2540,
    },
    {
        id: 2,
        id1c: "1234567890123456",
        category: [1,4,6],
        image: ['/testProduct.png'],
        title: "Вал среднего редуктора вход (без масл. насоса) RCW RD20-145, TDA A3297U1347 1",
        description: "Описание", //Сейчас нету, так на будущее
        stock: 200, 
        storeplace: "Владивосток",
        attributes: {
            weight: {
                name: 'Вес',
                type: 'weight',
                value: 100,
            },
            unitm: {
                name: 'Единицы измерения',
                type: 'unitm',
                value: 'шт',
            },
            manufacturer: {
                name: 'Производитель',
                type:'manufacturer',
                value: 'Meritor',
            },
            country: {
                name: 'Страна',
                type: 'country',
                value: 'США',
            },
            stockstore: {
                name: 'Склад',
                type:'stockstore',
                value: 'Владивосток',
            }
        },
        quantitySales: 0,
        price: 2540,
    },
    {
        id: 3,
        id1c: "1234567890123456",
        category: [1,4,6],
        image: ['/testProduct.png'],
        title: "Вал среднего редуктора вход (без масл. насоса) RCW RD20-145, TDA A3297U1347 1",
        description: "Описание", //Сейчас нету, так на будущее
        stock: 200, 
        storeplace: "Владивосток",
        attributes: {
            weight: {
                name: 'Вес',
                type: 'weight',
                value: 100,
            },
            unitm: {
                name: 'Единицы измерения',
                type: 'unitm',
                value: 'шт',
            },
            manufacturer: {
                name: 'Производитель',
                type:'manufacturer',
                value: 'Meritor',
            },
            country: {
                name: 'Страна',
                type: 'country',
                value: 'США',
            },
            stockstore: {
                name: 'Склад',
                type:'stockstore',
                value: 'Владивосток',
            }
        },
        quantitySales: 0,
        price: 2540,
    },       
    {
        id: 4,
        id1c: "1234567890123456",
        category: [1,4,6],
        image: ['/testProduct.png'],
        title: "Вал среднего редуктора вход (без масл. насоса)",
        description: "Описание", //Сейчас нету, так на будущее
        stock: 200, 
        storeplace: "Владивосток",
        attributes: {
            weight: {
                name: 'Вес',
                type: 'weight',
                value: 100,
            },
            unitm: {
                name: 'Единицы измерения',
                type: 'unitm',
                value: 'шт',
            },
            manufacturer: {
                name: 'Производитель',
                type:'manufacturer',
                value: 'Meritor',
            },
            country: {
                name: 'Страна',
                type: 'country',
                value: 'США',
            },
            stockstore: {
                name: 'Склад',
                type:'stockstore',
                value: 'Владивосток',
            }
        },
        quantitySales: 0,
        price: 2540,
    },       
    {
        id: 5,
        id1c: "1234567890123456",
        category: [1,4,6],
        image: ['/testProduct.png'],
        title: "Вал среднего редуктора вход (без масл. насоса) RCW RD20-145, TDA A3297U1347 1",
        description: "Описание", //Сейчас нету, так на будущее
        stock: 200, 
        storeplace: "Владивосток",
        attributes: {
            weight: {
                name: 'Вес',
                type: 'weight',
                value: 100,
            },
            unitm: {
                name: 'Единицы измерения',
                type: 'unitm',
                count: 'шт',
            },
            manufacturer: {
                name: 'Производитель',
                type:'manufacturer',
                value: 'Meritor',
            },
            country: {
                name: 'Страна',
                type: 'country',
                value: 'США',
            },
            stockstore: {
                name: 'Склад',
                type:'stockstore',
                value: 'Владивосток',
            }
        },
        quantitySales: 0,
        price: 2540,
    },       
]

const bestSalesSlice = createSlice({
    name: 'bestSales',
    initialState,
    reducers: {},
})

export const {actions, reducer} = bestSalesSlice;