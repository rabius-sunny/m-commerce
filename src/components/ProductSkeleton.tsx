interface ProductSkeletonProps {
  isLoading: boolean
}
export default function ProductSkeleton({ isLoading }: ProductSkeletonProps) {
  return isLoading ? (
    <div className='my-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
      {Array.from({ length: 6 }, (_, index) => index + 1).map(item => (
        <div key={item} className='group relative product'>
          <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden h-60 rounded-md lg:aspect-none lg:h-72'>
            <div className='h-full w-full bg-gray-300 rounded'></div>
          </div>
          <div className='mt-4 mb-2 px-3 flex justify-between items-center'>
            <div className='bg-gray-300 h-5 w-32 rounded'></div>
            <div className='bg-gray-300 h-5 w-12 rounded'></div>
          </div>
          <div className='mb-2 px-3 flex justify-between items-center'>
            <div className='bg-gray-300 h-3 w-24 rounded'></div>
            <div className='bg-gray-300 h-8 w-8 rounded-full'></div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <></>
  )
}
