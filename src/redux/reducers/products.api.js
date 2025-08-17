import { api } from "./api";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        mode: "cors",
        url: "/products?populate=*&filters[stock][$notNull]=true",
        method: "GET",
      }),
    }),
    getProduct: builder.query({
      query: (id = 0) => ({
        mode: "cors",
        url: `/products/${id}/?populate=*`,
        method: "GET",
      }),
    }),
    getProductOnPage: builder.query({
      query: (params = {}) => ({
        mode: "cors",
        url: `/products/?populate=*&pagination[page]=${
          params.page
        }&pagination[pageSize]=${params.pageSize}${
          !params.filters && params.catId
            ? "&filters[categories][id][$contains]=" + params.catId
            : ""
        }${
          params.filters && Array.isArray(params.filters)
            ? params.filters.map((item) => `${item}`)
            : ""
        }&filters[stock][$notNull]=true`,
        method: "GET",
      }),
    }),
    getFiltered: builder.query({
      query: (params = {}) => {
        const filters = [];
        const stringFilters = makeStringFilters(filters, params);
        return {
          mode: "cors",
          url: `/products/?populate=*${stringFilters}`,
          method: "GET",
        };
      },
    }),
  }),
});

function makeStringFilters(filters = [], params) {
  if (filters[0] === undefined) return "";

  let tempString = "";
  tempString += `${params.catId ? "&filters[categories][id][$contains]=" + params.catId : ""}`;
  tempString += `${params.volume ? "&filters[volume][$contains]=" + params.volume : ""}`;
  return tempString;
}

// function makeStringFilters(filters = []) {
//   if (filters[0] != "undefined") return "";

//   let tempString = "";
//   tempString += `${
//     params.catId ? "&filters[categories][id][$contains]=" + params.catId : ""
//   }`;
//   tempString += `${
//     params.volume ? "&filters[categories][id][$contains]=" + params.catId : ""
//   }`;
//   return `'}`;
// }

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductOnPageQuery,
  useGetFilteredQuery,
} = api;
