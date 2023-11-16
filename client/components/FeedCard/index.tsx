import Image from 'next/image'
import React from 'react'

type Props = {}

const FeedCard:React.FC = (props: Props) => {
  return (
    <main className='border-2 border-r-0 border-l-0 border-slate-100 p-5 hover:bg-slate-100 transition-all cursor-pointer'>
        <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-1'>
            <Image className='rounded-full' src="https://avatars.githubusercontent.com/u/132639448?v=4" alt='user-iamge' height={70} width={70} />
        </div>
        <div className='col-span-11'>
            <h5>Neeraj GS</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo minima deserunt quasi. Ullam voluptate blanditiis at accusamus quae quo magni dolor, perspiciatis quis?</p>

             {/* Buttons  */}
            <div className='flex justify-between mt-6 text-xl items-center w-[90%]'>
                <div>
                    comment
                </div>
                <div>
                    repost
                </div>
                <div>
                    Like heart
                </div>
                <div>
                    Upload
                </div>

            </div>
        </div>

    </div>
    </main>
    
  )
}

export default FeedCard