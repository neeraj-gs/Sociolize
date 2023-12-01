import { graphqlClient } from '@/clients/api';
import FeedCard from '@/components/FeedCard';
import { Button } from '@/components/ui/button';
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user';
import { useCurrentUser } from '@/hooks/user';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useCallback } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineNotification } from "react-icons/ai";
import { CiSaveDown2 } from "react-icons/ci";
import { PiBroadcastFill, PiUserSwitchThin } from "react-icons/pi";
import { RiHomeOfficeLine } from "react-icons/ri";
import { SiHashicorp, SiSocialblade } from "react-icons/si";
import { TbMessageCircleHeart } from "react-icons/tb";
import { GrGallery } from "react-icons/gr";




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



  const {user} = useCurrentUser()
  const queryClient = useQueryClient();

  const handleImageClick = useCallback(()=>{
    //when button is cleicked this button is called crete sa input tag select the type and a window of fiels is popping out
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept','images/*')
    input.click();
  },[])


  const handleLoginWithGoolge = useCallback(async(cred:CredentialResponse)=>{
    const googleToken = cred.credential
    if(!googleToken) return toast.error(`Google Verification Failed`)

    const {verifyGoogleToken} = await graphqlClient.request(verifyUserGoogleTokenQuery,{token:googleToken})
    toast.success(`Verified Successfully`)
    // console.log(verifyGoogleToken)

    if(verifyGoogleToken) window.localStorage.setItem("__sociolize_token",verifyGoogleToken)
    //have verified the and got the token , from now we need to sent the token as a header everytime we perform some operations on the cleint side
    await queryClient.invalidateQueries(["current-user"]); //automatically make a server request for me

  },[queryClient])  

  return (
    <main>
      <div className='grid grid-cols-12 h-screen w-screen px-56'>

        {/* Left Grid */}
        <div className='col-span-3  pt-8 px-4 ml-20 relative' >
          <div className='text-6xl w-fit  hover:bg-gray-200 rounded-full p-2 h-fit cursor-pointer transition-all'>
            <SiSocialblade  />
          </div>
          <div className='mt-6 text-xl pr-4'>
            <ul>
            {LeftMenuItems.map((i)=>{
              return(
                <li className=' w-fit flex justify-start items-center gap-4 hover:bg-gray-200 rounded-full px-3 py-3 cursor-pointer mt-4' key={i.title}><span>{i.icon}</span> <span>{i.title}</span></li>
              )
            })}
            </ul>
            <div className='mt-6 pr-2'>
              <Button className='bg-black p-4 rounded-full w-full mx-4 text-white text-lg hover:text-black' variant='ghost'><span className='mr-2'>P2P</span> <PiBroadcastFill /> </Button>
            </div>
          </div>
          {user && (
            <div className='absolute bottom-5 flex gap-2 items-center bg-slate-100 px-8 py-3 rounded-full'>
            {user && user.profileImageURL && <Image className='rounded-full' src={user?.profileImageURL} height={40} alt='userIMage' width={40}/>}
            <div>
              <h3 className='text-lg'>
              {user.firstName} {user.lastName}
              </h3>
            </div>
          </div>
          )}
          
        </div>

        {/* CenterGrid  */}
        <div className='col-span-5 border-r-2 border-l-2 border-slate-200'>
          <div>
          <div className='border-2 border-r-0 border-l-0 border-slate-50 p-5 hover:bg-slate-50 transition-all cursor-pointer'>
          <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-1'>
            {user?.profileImageURL && (
              <Image className='rounded-full' src={user?.profileImageURL} alt='user-iamge' height={70} width={70} />
            )}
          </div>
          <div className='col-span-11'>
              <textarea className='border w-full bg-transparent text-xl px-3 border-b border-slate-100' placeholder="What's Happening?" rows={4}></textarea>
              <div className='text-xl flex justify-between items-center'>
                <GrGallery onClick={handleImageClick} />
                <Button className='bg-black p-4 rounded-full mx-4 text-white text-sm hover:text-black' variant='ghost'><span className='mr-2'>Broadcast</span>  </Button>
              </div>
                
          </div>
          </div>
          </div>
          </div> 
          <FeedCard />
        </div>





        <div className='col-span-4 p-5'>
          {!user && (
            <div className='p-4 bg-slate-50 rounded-xl w-64'>
            <h1 className='text-2xl my-2 font-serif font-bold'>New to Sociolize?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoolge} />
          </div>
          )}
          {/* credential is a token generated by google it si a short lived token and expires after some time , token has information related to our credentials, we need to send this toke to the server 
          our server will talk to google and ask for informarion related to the suer if token is valid we will check if user with same emial exissts if not crete a user ands create a token 
          if exists we will create a token  */}
        </div>
      </div>
    </main>
  )
}
