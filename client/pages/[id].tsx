import FeedCard from '@/components/FeedCard'
import Layout from '@/components/Layout/Layout'
import { Tweet } from '@/gql/graphql'
import { useCurrentUser } from '@/hooks/user'
import type {NextPage} from 'next'
import Image from 'next/image'
import { BiLeftArrow } from 'react-icons/bi'

const UserProfilePage:NextPage=()=>{
    const {user} = useCurrentUser()
    return(
        <div>
            <Layout>
                <div>
                    <nav className='flex items-center gap-5 py-3 px-3'>
                        <BiLeftArrow className='text-xl' />
                        <div>
                            <h1 className='text-3xl font-extrabold'>Neeraj GS</h1>
                            <h1 className='text-sm text-slate-500'>100 Tweets</h1>
                        </div>
                    </nav>
                    <div className='p-6 border-b border-slate-100'>
                        {user?.profileImageURL && <Image src={user?.profileImageURL} alt='user-image' className='rounded-full' width={70} height={70} />}
                        <h1 className='mt-5 text-xl font-bold'>Neeraj GS</h1>
                    </div>
                    <div>
                        {user?.tweets?.map(t=> <FeedCard data={t as Tweet} key={t?.id} />)}
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default UserProfilePage

