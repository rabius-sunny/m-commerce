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
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const { id } = action.payload
      const item = state.cartItems.find(item => item.id === id)
      if (item) {
        item.quantity += 1
        return
      }
      state.cartItems.push(action.payload)
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const item = state.cartItems.find(item => item.id === id)
      if (item) {
        item.quantity += 1
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const item = state.cartItems.find(item => item.id === id)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.cartItems = state.cartItems.filter(
            item => item.id !== action.payload
          )
        }
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload
      )
    }
  }
})

export const { addItem, increaseQuantity, decreaseQuantity, removeItem } =
  cartSlice.actions
export default cartSlice.reducer
