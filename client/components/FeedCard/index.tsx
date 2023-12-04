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
           {data.author?.profileImageURL && <Image className='rounded-full' src={data.author.profileImageURL} alt='user-iamge' height={70} width={70} />} 
        </div>
        <div className='col-span-11'>
            <h5 className='font-bold'>
                <Link href={`/${data.author?.id}`}>{data.author?.firstName} {data.author?.lastName}</Link>
            </h5>
            <p>{data.content}</p>

             {/* Buttons  */}
            <div className='flex justify-between mt-6 text-xl items-center w-[90%]'>
                <div>
                    <FaRegComments />
                </div>
                <div>
                    <BiRepost />
                </div>
                <div>
                    <FaRegHeart />
                </div>
                <div>
                    <FaRegShareSquare />
                </div>

            </div>
        </div>

    </div>
    </main>
    
  )
}

export default FeedCard