import { configureStore } from '@reduxjs/toolkit'

import api from '../services/api'

import cartReducer from './reducers/cart'
import purchaseSummaryReducer from './reducers/purchaseSumarySlice'

export const store = configureStore({
  //rootreducer
  reducer: {
    cart: cartReducer,
    purchaseSummary: purchaseSummaryReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type AppDispatch = typeof store.dispatch

export type RootReducer = ReturnType<typeof store.getState>
