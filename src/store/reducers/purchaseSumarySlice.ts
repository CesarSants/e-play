import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type PurchaseSummaryState = {
  items: Game[]
  total: number
  paymentMethod: string
  installments: number
  purchaseDate: string
}

const initialState: PurchaseSummaryState = {
  items: [],
  total: 0,
  paymentMethod: '',
  installments: 0,
  purchaseDate: ''
}

const purchaseSummarySlice = createSlice({
  name: 'purchaseSummary',
  initialState,
  reducers: {
    setPurchaseSummary: (
      state,
      action: PayloadAction<PurchaseSummaryState>
    ) => {
      return action.payload
    },
    clearPurchaseSummary: () => initialState
  }
})

export const { setPurchaseSummary, clearPurchaseSummary } =
  purchaseSummarySlice.actions

export default purchaseSummarySlice.reducer
