import {api} from './api'

export const customersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCustomer: builder.query({
            query: (id) => ({
                mode: "cors",
                url: `/customers/${id}`,
                method: "GET",
            })
        }),
        createCustomer: (user = {}) => ({
            mode: "cors",
            url: `/customers`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json;',
            },
            body: JSON.stringify(user)
        }),
        authCustomer: (user = {}) => ({
            mode: "cors",
            url: `/customers/`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json;',
            },
            body: JSON.stringify(user)
        })
    })
})



export const { useGetCustomersQuery, useCreateCustomerQuery } = api;
