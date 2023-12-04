import FeedCard from '@/components/FeedCard'
import Layout from '@/components/Layout/Layout'
import { Tweet, User } from '@/gql/graphql'
import { useCurrentUser } from '@/hooks/user'
import type {GetServerSideProps, NextPage} from 'next'
import Image from 'next/image'
import { BiLeftArrow } from 'react-icons/bi'
import {useRouter} from 'next/router'
import { graphqlClient } from '@/clients/api'
import { getUserByIdQuery } from '@/graphql/query/user'

interface ServerProps{
    userInfo?:User
}



const UserProfilePage:NextPage<ServerProps>=(props)=>{
    const router = useRouter();

    
    return(
        <div>
            <Layout>
                <div>
                    <nav className='flex items-center gap-5 py-3 px-3'>
                        <BiLeftArrow className='text-xl' />
                        <div>
                            <h1 className='text-3xl font-extrabold'>Neeraj GS</h1>
                            <h1 className='text-sm text-slate-500'>{props.userInfo?.tweets?.length} Tweets</h1>
                        </div>
                    </nav>
                    <div className='p-6 border-b border-slate-100'>
                        {props.userInfo?.profileImageURL && <Image src={props.userInfo?.profileImageURL} alt='user-image' className='rounded-full' width={70} height={70} />}
                        <h1 className='mt-5 text-xl font-bold'>Neeraj GS</h1>
                    </div>
                    <div>
                        {props.userInfo?.tweets?.map(t=> <FeedCard data={t as Tweet} key={t?.id} />)}
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async(context) => {
    const id = context.query.id as string|undefined
    //feethcing user in server 
    //server rendered page
    if(!id) return {notFound:true,props:{user:undefined}}

    const userInfo = await graphqlClient.request(getUserByIdQuery,{id})

    if(!userInfo) return {notFound:true}

    return {
        props:{
            userInfo:userInfo.getUserById as User,
        }
    }
}

export default UserProfilePage

