interface IProduct {
  id: string
  title: string
  price: number
  category: string
  description: string
  image: string
}

interface ICartItem {
  id: string
  title: string
  price: number
  category: string
  image: string
  quantity: number
}

interface IAllCartItems {
  items: ICartItem[]
}
interface RootState {
  cart: IAllCartItems
}
