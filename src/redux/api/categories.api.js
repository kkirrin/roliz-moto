import {api} from './api'

export const categoriesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                mode: "cors",
                url: '/categories?populate=*',
                method: 'GET',
            }),

        }),
    })
})

export const {useGetCategoriesQuery} = api;
