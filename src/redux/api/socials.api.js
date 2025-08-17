import {api} from "./api"

const socialApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSocial: builder.query({
            query: () => ({
                mode: "cors",
                url: "/social-links?populate=*",
                method: "GET",
            })
        })
    })
})


export const {useGetSocialQuery} = api;
