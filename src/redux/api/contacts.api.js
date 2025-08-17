import {api} from './api'

export const contactsApi = api.injectEndpoints({
    endpoints: builder => ({
        getContacts: builder.query({
            query: () => ({
                mode: "cors",
                url: "/allcontacts?populate=*",
                method: 'GET',
            })
        })
    })
})

export const {useGetContactsQuery} = api;
