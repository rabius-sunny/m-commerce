import { Poppins } from 'next/font/google'
import React from 'react'

const popins = Poppins({
  weight: ['100', '200', '300', '400', '500', '700', '800'],
  subsets: ['latin']
})

interface IProp {
  children: React.ReactNode
}

export default function Layout({ children }: IProp) {
  return (
    <main className={`min-h-screen ${popins.className}`}>
      <div className='container mx-auto'>{children}</div>
      <footer className='bg-pink-500 text-white font-bold text-3xl text-center py-3 rounded-t-xl'>
        © M - COMMERCE
      </footer>
    </main>
  )
}
