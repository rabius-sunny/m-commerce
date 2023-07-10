import { Poppins } from 'next/font/google'
import React from 'react'

const popins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin']
})

export default function Layout({ children }: any) {
  return (
    <main className={`min-h-screen ${popins.className}`}>
      <div className='container mx-auto'>{children}</div>
    </main>
  )
}
