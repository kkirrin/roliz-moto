import {api} from "@/redux/api/api"

export const salesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSales: builder.query({
            query: () => ({
                mode: "cors",
                url: "/hotsales?populate=*",
                method: "GET",
            })
        })
    })
})

export const {useGetSalesQuery} = api;
