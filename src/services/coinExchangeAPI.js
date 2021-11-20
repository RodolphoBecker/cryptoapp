import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://economia.awesomeapi.com.br/last";

const createRequest = (url) => ({ url });

export const coinExchangeApi = createApi({
	reducerPath: "coinExchangeApi",
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getCoinExchange: builder.query({
			query: () => createRequest(`/USD-BRL`),
		}),
	}),
});

export const { useGetCoinExchangeQuery } = coinExchangeApi;
