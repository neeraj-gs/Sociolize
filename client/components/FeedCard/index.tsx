import Image from 'next/image'
import React from 'react'

type Props = {}

const FeedCard:React.FC = (props: Props) => {
  return (
    <div className='grid grid-cols-12'>
        <div className='col-span-4'>
            <Image src="https://avatars.githubusercontent.com/u/132639448?v=4" alt='user-iamge' height={50} width={50} />
        </div>
        <div className='col-span-8'></div>

    </div>
  )
}

export default FeedCard