import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ICartState {
  items: ICartItem[]
}

const initialState: ICartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const { id } = action.payload
      const item = state.items.find(item => item.id === id)
      if (item) {
        item.quantity += 1
        return
      }
      state.items.push(action.payload)
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const item = state.items.find(item => item.id === id)
      if (item) {
        item.quantity += 1
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const item = state.items.find(item => item.id === id)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.items = state.items.filter(item => item.id !== action.payload)
        }
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    emptyCart: state => {
      state.items.length = 0
    }
  }
})

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  emptyCart
} = cartSlice.actions
export default cartSlice.reducer
