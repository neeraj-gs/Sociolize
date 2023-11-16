import { Inter } from 'next/font/google'
import React from 'react';
import { SiSocialblade } from "react-icons/si";
import { SiHashicorp } from "react-icons/si";
import { RiHomeOfficeLine } from "react-icons/ri";
import { Button } from '@/components/ui/button';
import { AiOutlineNotification } from "react-icons/ai";
import { TbMessageCircleHeart } from "react-icons/tb";
import { CiSaveDown2 } from "react-icons/ci";
import { PiUserSwitchThin } from "react-icons/pi";
import { PiBroadcastFill } from "react-icons/pi";


const inter = Inter({ subsets: ['latin'] })

interface LeftGridButtons{
  title:string;
  icon:React.ReactNode
}

const LeftMenuItems = [
  {
    title: "Home",
    icon: <RiHomeOfficeLine />
  },
  {
    title: "Explore",
    icon: <SiHashicorp />
  },
  {
    title: "Notifications",
    icon: <AiOutlineNotification /> 
  },
  {
    title: "Messages",
    icon: <TbMessageCircleHeart /> 
  },
  {
    title: "Saved",
    icon: <CiSaveDown2 /> 
  },
  {
    title: "Profile",
    icon: <PiUserSwitchThin /> 
  },
  

]



export default function Home() {
  return (
    <main className={inter.className}>
      <div className='grid grid-cols-12 h-screen w-screen px-56'>

        {/* Left Grid */}
        <div className='col-span-3  pt-8 px-4' >
          <div className='text-6xl w-fit  hover:bg-gray-200 rounded-full p-2 h-fit cursor-pointer transition-all'>
            <SiSocialblade  />
          </div>
          <div className='mt-6 text-xl pr-4'>
            <ul>
            {LeftMenuItems.map((i)=>{
              return(
                <li className=' w-fit flex justify-start items-center gap-4 hover:bg-gray-200 rounded-full px-5 py-2 cursor-pointer mt-4' key={i.title}><span>{i.icon}</span> <span>{i.title}</span></li>
              )
            })}
            </ul>
            <div className='mt-6 pr-2'>
              <Button className='bg-black p-4 rounded-full w-full mx-4 text-white text-lg hover:text-black' variant='ghost'><span className='mr-2'>P2P</span> <PiBroadcastFill /> </Button>
            </div>
          </div>
        </div>

        {/* CenterGrid  */}
        <div className='col-span-6 border-r-2 border-l-2 border-slate-200'></div>





        <div className='col-span-3'></div>
      </div>
    </main>
  )
}
