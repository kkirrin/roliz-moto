import { api } from "./api";

export const slidersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSliders: builder.query({
      query: () => ({
        mode: "cors",
        url: "/sliders?populate=*",
        method: "GET",
      }),
    }),
  }),
});

export const servicesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        mode: "cors",
        url: "/services?populate=*",
        method: "GET",
      }),
    }),
  }),
});

export const aboutAs = api.injectEndpoints({
  endpoints: (builder) => ({
    getAboutAs: builder.query({
      query: () => ({
        mode: "cors",
        url: "/aboutas?populate=*",
        method: "GET",
      }),
    }),
  }),
});

export const optPageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOptPage: builder.query({
      query: () => ({
        mode: "cors",
        url: "/opt-page?populate=*",
        method: "GET",
      }),
    }),
  }),
});

export const deliveryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDelivery: builder.query({
      query: () => ({
        mode: "cors",
        url: "/delivery-and-buy?populate=*",
        method: "GET",
      }),
    }),
  }),
});

export const warrantyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWarranty: builder.query({
      query: () => ({
        mode: "cors",
        url: "/warranty?populate=*",
        method: "GET",
      }),
    }),
  }),
});

export const partnersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPartners: builder.query({
      query: () => ({
        mode: "cors",
        url: "/spisok-partnerov?populate=*",
        method: "GET",
      }),
    }),
  }),
});

export const policyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPolicy: builder.query({
      query: () => ({
        mode: "cors",
        url: "/stranicza-politika-konfidenczialnosti?populate=*",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetSlidersQuery,
  useGetServicesQuery,
  useGetContactsQuery,
  useGetAboutAsQuery,
  useGetOptPageQuery,
  useGetDeliveryQuery,
  useGetWarrantyQuery,
  useGetPartnersQuery,
  useGetPolicyQuery
} = api;
