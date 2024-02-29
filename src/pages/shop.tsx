import ProductLists from '@/components/ProductLists'
import ProductSkeleton from '@/components/ProductSkeleton'
import { useAppSelector } from '@/states'
import endpoint from '@/utils/endpoint'
import Link from 'next/link'
import { useState } from 'react'

interface IProps {
  products: IProduct[]
  categories: string[]
}

export default function Shop({ products, categories }: IProps) {
  const [sortKey, setSortKey] = useState<string>('')
  const [categoryKey, setCategoryKey] = useState<string>('')
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const cart = useAppSelector((state) => state.cart.items)
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true)
    const selectedSortKey = event.target.value
    setSortKey(selectedSortKey)

    fetch(`${endpoint}?sort=${selectedSortKey}`)
      .then((response) => response.json())
      .then((data) => setFilteredProducts(data))
      .catch((err) => alert('Error occured'))
      .finally(() => setIsLoading(false))
  }

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsLoading(true)
    const selectedCategoryKey = event.target.value
    setCategoryKey(selectedCategoryKey)
    if (selectedCategoryKey === 'all') {
      // Reseting to default products when category option is cleared
      setFilteredProducts(products)
    } else {
      fetch(`https://fakestoreapi.com/products/category/${selectedCategoryKey}`)
        .then((response) => response.json())
        .then((data) => setFilteredProducts(data))
        .catch((err) => alert('Error occured'))
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <div className='min-h-screen'>
      <div className='my-8 text-center'>
        <div className='flex items-center justify-between'>
          <p className='text-pink-500 font-medium text-xl sm:text-3xl'>
            M-Commerce
          </p>
          <Link
            href='/cart'
            className='text-3xl md:text-5xl relative'
          >
            🛍
            <span className='text-xs font-light bg-sky-500 border-4 border-white text-white px-2 py-[1.5px] rounded-full absolute top-0 left-6 md:left-9'>
              {cart.length}
            </span>
          </Link>
        </div>
        <h1 className='text-center my-4 text-3xl font-bold text-slate-600'>
          New Arrivals
        </h1>
        <p className='text-slate-500 font-light text-lg'>
          Thoughtfully designed objects for the workspace, home and travel.
        </p>
      </div>
      <div className='sm:flex items-center justify-between bg-sky-500 p-4 rounded-t-xl'>
        <div className='mb-4 sm:mb-0'>
          <label
            htmlFor='sortSelect'
            className='text-white font-light block sm:inline'
          >
            Sort By:
          </label>
          <select
            id='sortSelect'
            className=' sm:ml-3 rounded-md border-0 focus:border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 focus:ring-2 focus:ring-pink-500 sm:text-sm sm:leading-6 w-full sm:w-auto'
            value={sortKey}
            onChange={handleSortChange}
          >
            <option value='asc'>Asc</option>
            <option value='desc'>Desc</option>
          </select>
        </div>
        <div>
          <label
            className='text-white font-light block sm:inline'
            htmlFor='categorySelect'
          >
            Filter By Category:
          </label>
          <select
            className=' sm:ml-3 rounded-md border-0 focus:border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 focus:ring-2 focus:ring-pink-500 sm:text-sm sm:leading-6 w-full sm:w-auto'
            id='categorySelect'
            value={categoryKey}
            onChange={handleCategoryChange}
          >
            <option value='all'>All</option>
            {categories?.map((item: string, idx: number) => (
              <option
                value={item}
                key={idx}
              >
                {item.toLocaleUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isLoading ? (
        <ProductSkeleton isLoading={isLoading} />
      ) : (
        <ProductLists products={filteredProducts} />
      )}
    </div>
  )
}

export async function getStaticProps() {
  try {
    const res = await fetch(`${endpoint}?limit=15`)
    const catRes = await fetch(`${endpoint}/categories`)
    const products = await res.json()
    const categories = await catRes.json()

    return {
      props: {
        products,
        categories
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
