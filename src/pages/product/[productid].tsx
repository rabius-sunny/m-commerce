import Link from 'next/link'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/states'
import { addItem } from '@/states/cartSlice'
import endpoint from '@/utils/endpoint'
import RelevantProducts from '@/components/RelevantProducts'

export default function ProductDetails({ product }: any) {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cart.items)

  if (!product) {
    return <div>Loading...</div>
  }
  const { title, price, description, image, id, category } = product

  return (
    <div>
      <div className='max-w-5xl mx-auto px-4 py-8'>
        <div className='mb-8 flex items-center justify-between'>
          <Link href='/shop' className='flex text-sky-600 items-center gap-2'>
            <span className='text-3xl'>←</span>
            <span>go to shop</span>
          </Link>
          <Link href='/cart' className='text-3xl sm:text-5xl relative'>
            🛍
            <span className='text-xs font-light bg-sky-500 border-4 border-white text-white px-2 py-[1.5px] rounded-full absolute top-0 left-9'>
              {cart.length}
            </span>
          </Link>
        </div>
        <div className='flex flex-col items-center md:flex-row'>
          <div className='md:w-1/2'>
            <Image
              src={image}
              alt={title}
              width={300}
              height={300}
              className='rounded-lg w-full p-4 shadow-lg'
            />
          </div>
          <div className='md:w-1/2 md:ml-8 mt-4 md:mt-0'>
            <h2 className='text-3xl font-bold mb-4'>{title}</h2>
            <div className='mb-4 flex justify-between items-center'>
              <p className='  bg-pink-600 text-white font-light px-2 py-1 rounded'>
                ◉ {category}
              </p>
              <p className='text-3xl font-medium text-pink-600 mb-4'>
                ${price}
              </p>
            </div>
            <p className='text-gray-700 font-light mb-4'>{description}</p>
            <button
              onClick={() =>
                dispatch(
                  addItem({
                    title,
                    price,
                    image,
                    id,
                    category,
                    quantity: 1
                  })
                )
              }
              className='rounded-md border w-full lg:w-auto border-transparent bg-sky-500 px-8 py-3 text-center font-medium text-white hover:bg-sky-600'
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <RelevantProducts category={category} />
    </div>
  )
}

export async function getStaticPaths() {
  try {
    const res = await fetch(endpoint)
    const products = await res.json()
    const paths = products.map((product: IProduct) => ({
      params: { productid: product.id.toString() }
    }))

    return {
      paths,
      fallback: false
    }
  } catch (error) {
    console.log('Error on fetching products:', error)

    return {
      paths: [],
      fallback: false
    }
  }
}

export const getStaticProps = async ({ params }: any) => {
  const productid = params['productid']

  try {
    const res = await fetch(`${endpoint}/${productid}`)
    const product = await res.json()

    return {
      props: {
        product
      }
    }
  } catch (error) {
    console.log('Error on fetching product:', error)

    return {
      props: {
        product: null
      }
    }
  }
}
