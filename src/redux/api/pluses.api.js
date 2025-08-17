import {api} from "./api"

const plusesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPluses: builder.query({
            query: () => ({
                mode: "cors",
                url: "/preimushhestvas?populate=*",
                method: "GET",
            })
        })
    })
})


export const {useGetPlusesQuery} = api;
