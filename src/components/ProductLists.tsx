import { useAppDispatch } from '@/states'
import { addItem } from '@/states/cartSlice'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductLists({ products }: any) {
  const dispatch = useAppDispatch()

  const handleAddItem = (product: IProduct) => {
    const { id, title, price, category, image } = product
    dispatch(addItem({ id, title, price, category, image, quantity: 1 }))
  }
  return (
    <div className='mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
      {products.map((product: IProduct) => (
        <div key={product.id} className='group relative product'>
          <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 group-hover:transform group-hover:scale-110 transition duration-300 lg:h-80'>
            <Image
              src={product.image}
              alt={product.title}
              width={150}
              height={100}
              className='h-full w-full p-8'
            />
          </div>
          <div className='mt-1 mb-2 px-3 flex justify-between items-center'>
            <div>
              <h3 className='text-md text-gray-700'>
                <Link href={`/product/${product.id}`}>
                  <span aria-hidden='true' className='absolute inset-0' />
                  {product.title.slice(0, 25)}...
                </Link>
              </h3>
            </div>
            <p className='text-pink-500 text-xl font-medium'>
              ${product.price}
            </p>
          </div>
          <div className='mb-2 px-3 flex justify-between items-center'>
            <p className='mt-1 text-sm text-gray-500'>◉ {product.category}</p>
            <button
              onClick={() => handleAddItem(product)}
              className='border-2 border-gray-300 hover:border-pink-500 px-2 py-[0.35rem] rounded-full z-10'
            >
              🛒
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
