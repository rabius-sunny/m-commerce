import endpoint from '@/utils/endpoint'
import useSWR from 'swr'
import ProductLists from './ProductLists'

export default function RelevantProducts({ category }: any) {
  const fetcher = (path: string) => fetch(path).then(res => res.json())
  const { data, error, isLoading } = useSWR(
    `${endpoint}/category/${category}`,
    fetcher
  )
  return (
    <div className='mb-8'>
      <h2 className='text-2xl text-sky-500 font-medium'>
        Items you make like...
      </h2>
      {!isLoading && !error && <ProductLists products={data} />}
    </div>
  )
}
