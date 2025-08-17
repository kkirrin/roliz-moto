"use client";

import { configureStore } from "@reduxjs/toolkit";

import { api } from "@/redux/api/api";

import { reducer as pageReducer } from "@/redux/reducers/pagesReducer";
import { reducer as menuReducer } from "@/redux/reducers/navReducer";
import { reducer as partnersReducer } from "@/redux/reducers/partnersReducer";
import { reducer as slidesReducer } from "@/redux/reducers/slidesReducer";
import { reducer as serviceRecducer } from "@/redux/reducers/serviceReducer";
import { reducer as categoryReducer } from "@/redux/reducers/categoryReducer";
import { reducer as productReducer } from "@/redux/reducers/productReducer";
import { reducer as bestSalesReducer } from "@/redux/reducers/bestSalesReducer";
import { reducer as cartReducer } from "@/redux/reducers/cartReducer";
import { reducer as customersReducer } from "@/redux/reducers/customerReducer";
import { reducer as filtersReducer } from "@/redux/reducers/filtersReducer";
import { reducer as mainReducer } from "@/redux/reducers/mainReducer";
import viewReducer from "@/redux/reducers/viewReducer";
import sortingReducer from '@/redux/reducers/sortingReducer';
import sideReducer from '@/redux/reducers/sideReducer';

const rootReducer = {
  [api.reducerPath]: api.reducer,

  main: mainReducer,
  pages: pageReducer,
  menu: menuReducer,
  partners: partnersReducer,
  slides: slidesReducer,
  service: serviceRecducer,
  category: categoryReducer,
  products: productReducer,
  bestsales: bestSalesReducer,
  cart: cartReducer,
  filters: filtersReducer,
  customers: customersReducer,
  view: viewReducer,
  sorting: sortingReducer,
  side: sideReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
