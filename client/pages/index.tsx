import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div className='grid grid-cols-12 h-screen w-screen'>
        <div className='col-span-3'></div>
        <div className='col-span-6 border-r-2 border-l-2 border-slate-200'></div>
        <div className='col-span-3'></div>
      </div>
    </main>
  )
}
