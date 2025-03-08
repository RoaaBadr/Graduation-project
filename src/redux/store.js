import { configureStore } from '@reduxjs/toolkit';
import ArticlesSlice from './reducers/ArticlesSlice';
import userSlice from './reducers/userSlice';
 import authSlice from "./reducers/authSlice";
const Store = configureStore({
	reducer: {
		auth:authSlice,
		articles: ArticlesSlice,
		user: userSlice,
	},
});

export default Store;
