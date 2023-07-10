import endpoint from '@/utils/endpoint'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function shop({ products }: any) {
  return (
    <div>
      <h1 className='text-center my-8 text-3xl text-slate-600'>
        Available Products
      </h1>
      <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
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
            <div className='mt-1 mb-2 px-3 flex justify-between'>
              <div>
                <h3 className='text-sm text-gray-700'>
                  <Link href={`/product/${product.id}`}>
                    <span aria-hidden='true' className='absolute inset-0' />
                    {product.title}
                  </Link>
                </h3>
                <p className='mt-1 text-sm text-gray-500'>{product.category}</p>
              </div>
              <p className='text-sm font-medium text-gray-900'>
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
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
