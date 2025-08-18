import { api } from "./api";
import { useSelector } from "react-redux";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (categoryId) => ({
        mode: "cors",
        url: `/products?populate=*&filters[categories][id][$eq]=63`,
        method: "GET",
      }),
    }),
    getProduct: builder.query({
      query: (id = 0) => ({
        mode: "cors",
        url: `/products/${id}/?populate=*&filters[stock][$notNull]=true&filters[stock][$ne]=0&sort[0]=title:asc`,
        method: "GET",
      }),
    }),
    getProductOnPage: builder.query({
      query: (params = {}) => {
        // Проверка на наличие параметров перед доступом к ним
        const page = params.page || 1;
        const pageSize = params.pageSize || 10;
        const filters = params.filters || [];

        // Формирование фильтров для категорий
        const categoryFilters = filters
          .map((filter) =>
            filter ? `&filters[categories][id][$eq]=${filter}` : ""
          )
          .join("");


        // Определяем параметр сортировки
        let sortParam;
        switch (params.sortOrder) {
          case "asc":
            sortParam = "price:asc";
            break;
          case "desc":
            sortParam = "price:desc";
            break;
          case "alphabet":
            sortParam = "title:asc";
            break;
          default:
            sortParam = "price:asc";
        }

        return {
          mode: "cors",
          url: `/products/?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}${categoryFilters}&filters[stock][$notNull]=true&filters[stock][$ne]=0&filters[price][$gt]=0&sort[0]=${sortParam}`,
          method: "GET",
        };
      },
    }),

    getFiltered: builder.query({
      query: (params = {}) => {
        const filters = [];
        const stringFilters = makeStringFilters(filters, params);
        return {
          mode: "cors",
          url: `/products/?populate=*${stringFilters}&sort[0]=title:asc`,
          method: "GET",
        };
      },
    }),
    getProductsByCategory: builder.query({
      query: (categoryId) => ({
        mode: "cors",
        url: `/products/?populate=*&filters[categories][id][$eq]=${categoryId}&filters[stock][$notNull]=true&filters[stock][$ne]=0&filters[price][$gt]=0&sort[0]=title:asc`,
        method: "GET",
      }),
    }),
  }),
});

function makeStringFilters(filters = [], params) {
  if (filters[0] !== undefined) return "";

  let tempString = "";
  tempString += `${
    params.catId ? "&filters[categories][id][$contains]=" + params.catId : ""
  }`;
  tempString += `${
    params.volume ? "&filters[categories][id][$contains]=" + params.volume : ""
  }`;
  return tempString;
}

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductOnPageQuery,
  useGetProductsByCategoryQuery,
} = productsApi;
