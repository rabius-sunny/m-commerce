import { Poppins } from 'next/font/google'

const popins = Poppins({
  weight: ['100', '200', '300', '400', '500', '700', '800'],
  subsets: ['latin']
})

export default function Layout({ children }: any) {
  return (
    <main className={`min-h-screen ${popins.className}`}>
      <div className='container mx-auto'>{children}</div>
    </main>
  )
}
