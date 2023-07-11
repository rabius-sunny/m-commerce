import ProductLists from '@/components/ProductLists'
import { useAppSelector } from '@/states'
import endpoint from '@/utils/endpoint'
import Link from 'next/link'

export default function Shop({ products }: any) {
  const cart = useAppSelector(state => state.cart.cartItems)
  return (
    <div>
      <div className='my-8 text-center'>
        <div className='flex items-center justify-between'>
          <p className='text-pink-500 font-extralight text-xl sm:text-3xl'>
            M-Commerce
          </p>
          <Link href='/cart' className='text-3xl sm:text-5xl relative'>
            🛍
            <span className='text-xs font-light bg-sky-500 border-4 border-white text-white px-2 py-[1.5px] rounded-full absolute top-0 left-9'>
              {cart.length}
            </span>
          </Link>
        </div>
        <h1 className='text-center my-4 text-3xl font-bold text-slate-600'>
          New Arrivals
        </h1>
        <p className='text-slate-500 font-light text-lg'>
          Thoughtfully designed objects for the workspace, home, and travel.
        </p>
      </div>
      <ProductLists products={products} />
    </div>
  )
}

export async function getStaticProps() {
  try {
    const res = await fetch(`${endpoint}?limit=15`)
    const products = await res.json()

    return {
      props: {
        products
      }
    }
  } catch (error) {
    console.log('Error on fetching products:', error)

    return {
      props: {
        products: []
      }
    }
  }
}
