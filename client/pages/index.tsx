import { Inter } from 'next/font/google'
import React from 'react';
import { SiSocialblade } from "react-icons/si";
import { RiHomeOfficeLine } from "react-icons/ri";

const inter = Inter({ subsets: ['latin'] })

interface LeftGridButtons{
  title:string;
  icon:React.ReactNode
}

const LeftMenuItems = [
  {
    title: "Home",
    icon: <RiHomeOfficeLine />
  }
]



export default function Home() {
  return (
    <main>
      <div className='grid grid-cols-12 h-screen w-screen px-56'>

        {/* Left Grid */}
        <div className='col-span-3 flex justify-start pt-8'>
          <div className='text-5xl hover:bg-gray-200 rounded-full p-2 h-fit cursor-pointer transition-all'>
          <SiSocialblade  />
          </div>
          
        </div>

        
        <div className='col-span-6 border-r-2 border-l-2 border-slate-200'></div>
        <div className='col-span-3'></div>
      </div>
    </main>
  )
}
