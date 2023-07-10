import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ICartState {
  cartItems: ICartItem[]
}

const initialState: ICartState = {
  cartItems: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {}
})

export const {} = cartSlice.actions
export default cartSlice.reducer
