import endpoint from '@/utils/endpoint'
import useSWR from 'swr'
import ProductLists from './ProductLists'
import ProductSkeleton from './ProductSkeleton'

interface IProps {
  category: string
}
export default function RelevantProducts({ category }: IProps) {
  const fetcher = (path: string) => fetch(path).then(res => res.json())
  const { data, error, isLoading } = useSWR(
    `${endpoint}/category/${category}`,
    fetcher
  )
  return (
    <div>
      <h2 className='text-2xl text-sky-500 font-medium'>
        Items you make like...
      </h2>
      {!isLoading && !error ? (
        <ProductLists isLoading={isLoading} products={data} />
      ) : (
        <ProductSkeleton isLoading={isLoading} />
      )}
    </div>
  )
}
