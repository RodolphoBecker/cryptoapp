import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoAPI";
import { cryptoNewsApi } from "../services/cryptoNewsAPI";
import { coinExchangeApi } from "../services/coinExchangeAPI";

export default configureStore({
	reducer: {
		[cryptoApi.reducerPath]: cryptoApi.reducer,
		[cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
		[coinExchangeApi.reducerPath]: coinExchangeApi.reducer,
	},
});
