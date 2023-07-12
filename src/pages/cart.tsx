import { useAppDispatch, useAppSelector } from '@/states'
import {
  decreaseQuantity,
  emptyCart,
  increaseQuantity,
  removeItem
} from '@/states/cartSlice'
import Image from 'next/image'
import Link from 'next/link'

export default function Cart() {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cart.items)

  const calculateTotal = () => {
    const result = cart.reduce(
      (total: number, item: ICartItem) => total + item.price * item.quantity,
      0
    )
    return Number(result.toFixed(2))
  }
  const tax = (calculateTotal() * 1) / 100
  const grandTotal = cart.length
    ? (calculateTotal() + 5 + tax).toFixed(2)
    : '0.00'

  return (
    <div className=' min-h-screen'>
      <div className='flex items-center justify-between'>
        <div className='flex-1'>
          <Link href='/shop' className='flex text-sky-600 items-center gap-2'>
            <span className='text-3xl'>←</span>
            <span>go to shop</span>
          </Link>
        </div>
        <h1 className='text-center my-12 text-3xl font-bold text-slate-600'>
          Your Cart
        </h1>
        <div className=' flex-1'></div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-5'>
        <div className='border-2 border-gray-100 rounded-lg p-5 mb-8'>
          {cart.length ? (
            cart.map((item: ICartItem, idx: number) => (
              <div key={idx}>
                {idx !== 0 && <hr className='my-4' />}
                <div className='flex items-start justify-between'>
                  <div className='flex gap-4'>
                    <div className='hidden xl:block'>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={150}
                        height={100}
                      />
                    </div>
                    <div className='xl:hidden'>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={96}
                        height={96}
                      />
                    </div>

                    <div className='relative'>
                      <Link href={`/product/${item.id}`}>
                        <h3 className='font-medium text-sm md:text-lg lg:text-sm xl:text-lg text-sky-500'>
                          {item.title.slice(0, 20)}
                          {'... ➙'}
                        </h3>
                      </Link>
                      <p className='font-light text-sm text-gray-500'>
                        {item.category}
                      </p>
                      <p className='text-sm text-gray-500'>${item.price}</p>
                      <div className='md:hidden lg:block xl:hidden mt-4 mb-10'>
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className='action'
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className='action'
                        >
                          +
                        </button>
                      </div>
                      <div className=' absolute bottom-0'>
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className='hidden md:block lg:hidden xl:block'>
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className='action'
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className='action'
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className='text-gray-400 hover:bg-gray-100 rounded px-2 font-bold text-3xl'
                  >
                    ⤬
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h2 className='text-2xl text-center text-red-500 font-semibold'>
              Your cart is empty now!
            </h2>
          )}
        </div>
        <div className='mb-8 lg:mb-0'>
          <div className='bg-gray-100 rounded-lg p-5'>
            <h2 className='font-semibold text-sky-500 text-xl text-center'>
              Order Summery
            </h2>
            <div className='flex justify-between mb-4'>
              <p className='text-gray-500'>Subtotal</p>
              <p>${calculateTotal()}</p>
            </div>
            <hr className='mb-3' />
            <div className='flex justify-between mb-4'>
              <p className='text-gray-500'>Shipping estimate</p>
              <p>${cart.length ? '5.00' : '0.00'}</p>
            </div>
            <hr className='mb-3' />
            <div className='flex justify-between mb-4'>
              <p className='text-gray-500'>Tax estimate</p>
              <p>${((calculateTotal() * 1) / 100).toFixed(2)}</p>
            </div>
            <hr className='mb-3' />
            <div className='flex justify-between'>
              <p className='text-gray-800'>Order total</p>
              <p className='font-semibold'>${grandTotal}</p>
            </div>
            <button className='mt-8 rounded-md border w-full border-transparent bg-sky-500 px-8 py-3 text-center font-medium text-white hover:bg-sky-600'>
              Checkout
            </button>
            <button
              onClick={() => dispatch(emptyCart())}
              className='mt-5 rounded-md border w-full border-transparent bg-pink-500 px-8 py-3 text-center font-medium text-white hover:bg-pink-600'
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
