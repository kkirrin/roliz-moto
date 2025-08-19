import {api} from './api'

export const mainCategoriesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMainCategories: builder.query({
            query: () => ({
                mode: "cors",
                url: 'categories?fields[0]=name&populate[parent][fields][0]=id&populate[childs][fields][0]=id&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[icon][fields][0]=url&populate[icon][fields][1]=alternativeText',
                method: 'GET',
            }),

        }),
    })
})

export const {useGetMainCategoriesQuery} = mainCategoriesApi;
