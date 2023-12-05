import Image from 'next/image'
import React from 'react'
import { FaRegComments } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegShareSquare } from "react-icons/fa";
import { Tweet } from '@/gql/graphql';
import Link from 'next/link';


interface FeedCardProps{
    data:Tweet
}


const FeedCard:React.FC<FeedCardProps> = (props) => {
    const {data} = props
  return (
    <main className='border-2 border-r-0 border-l-0 border-slate-50 p-5 hover:bg-slate-50 transition-all cursor-pointer'>
        <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-1'>
           {data.author?.profileImageURL && <Image className='rounded-full' src={data.author.profileImageURL} alt='user-iamge' height={100} width={100} />} 
        </div>
        <div className='col-span-11'>
            <h5 className='font-bold text-lg'>
                <Link href={`/${data.author?.id}`}>{data.author?.firstName} {data.author?.lastName}</Link>
            </h5>
            <p className='mt-3'>{data.content}</p>
            {
                data.imageURL && <Image src={data.imageURL} alt='img-tweet' width={400} height={500} />
            }

             {/* Buttons  */}
            <div className='flex justify-between mt-6 text-xl items-center w-[90%]'>
                <div>
                    <FaRegComments className='hover:cursor-pointer hover:text-blue-400' />
                </div>
                <div>
                    <BiRepost className='hover:cursor-pointer hover:text-green-400 text-2xl' />
                </div>
                <div>
                    <FaRegHeart className='hover:cursor-pointer hover:text-red-500' />
                </div>
                <div>
                    <FaRegShareSquare className='hover:cursor-pointer hover:text-orange-600' />
                </div>

            </div>
        </div>

    </div>
    </main>
    
  )
}

export default FeedCard