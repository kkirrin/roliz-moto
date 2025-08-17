import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getDataProducts: (state, action) => {
      const tempProducts = action.payload.map((item, index) => {
        return {
          id: item.id,
          id1c: item.attributes.id1c,
          category: item.attributes?.categories?.data
            ? item.attributes.categories.data.map((item) => item.id)
            : [],
          image: item.attributes?.imgs?.data
            ? item.attributes.imgs.data.map((item) => item.attributes.url)
            : "/noImage.jpg",
          title: item.attributes.title,
          description: item.attributes.description, //Сейчас нету, так на будущее
          stock: Number.parseInt(item.attributes.stock),
          storeplace: item.attributes.storeplace,
          attributes: item.attributes.Attributes?.attributes
            ? item.attributes.Attributes.attributes.map((item) => {
                if (item.type === "Number") {
                  return {
                    name: item.name,
                    type: item.type,
                    value: Number.parseInt(item.value),
                  };
                }
                return item;
              })
            : [],
          quantitySales: Number.parseInt(item.attributes.quantitySales),
          price: !isNaN(Number.parseInt(item.attributes.price))
            ? Number.parseInt(item.attributes.price)
            : 1,
          optPrice: Number.parseInt(item.attributes.price),
        };
      });
      state.products = tempProducts;
      ////console.log(state.products)
    },
  },
});

export const { actions, reducer } = productSlice;
