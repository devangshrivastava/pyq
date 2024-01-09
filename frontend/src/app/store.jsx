import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from '../services/userAuthApi'
import authReducer from '../features/authSlice'
import {coreApi} from '../services/coreApi'
import userReducer from '../features/userSlice'


export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [coreApi.reducerPath]: coreApi.reducer,
    auth: authReducer, 
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware, coreApi.middleware),
})

setupListeners(store.dispatch)