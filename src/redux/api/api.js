import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const BASE_URL = "http://roliz-moto/api";
// const BASE_URL = "http://localhost:1338/api";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["category"],
  baseQuery: fetchBaseQuery({
    // baseUrl: BASE_URL,
    baseUrl: `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_URL_API}/api`,
    mode: "cors",
    method: "PATCH",
    credentials: "same-origin",
    prepareHeaders: (headers) => {
      const accessToken = true;
      if (accessToken) {
        headers.set(
          "authorization",
          `Bearer ${process.env.NEXT_PUBLIC_JWT_KEY}`
        );
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    main: builder.query({
      query: () => "/",
    }),
  }),
});
