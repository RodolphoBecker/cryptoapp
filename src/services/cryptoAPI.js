import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
	"x-rapidapi-host": "coinranking1.p.rapidapi.com",
	"x-rapidapi-key": "f0b6f3153dmsh52f987eb5e436c6p1f17acjsnbe2abb6254b1",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
	reducerPath: "cryptoApi",
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getCryptos: builder.query({
			query: (count) => createRequest(`/coins?limit=${count}`),
		}),
		getCryptoDetails: builder.query({
			query: (coinId) => createRequest(`/coin/${coinId}`),
		}),
		getCryptoHistory: builder.query({
			query: ({ coinId, timePeriod }) =>
				createRequest(`/coin/${coinId}/history/${timePeriod}`),
		}),
		getExchanges: builder.query({
			query: () => createRequest("/exchanges"),
		}),
	}),
});

export const {
	useGetCryptosQuery,
	useGetCryptoDetailsQuery,
	useGetCryptoHistoryQuery,
	useGetExchangesQuery
} = cryptoApi;
