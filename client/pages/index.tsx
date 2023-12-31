import { graphqlClient } from '@/clients/api';
import FeedCard from '@/components/FeedCard';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Tweet } from '@/gql/graphql';
import { getAllTweetsQuery, getSignedURLForTweetQuery } from '@/graphql/query/tweet';
import { useCreateTweet, useGetAllTweets } from '@/hooks/tweet';
import { useCurrentUser } from '@/hooks/user';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { GrGallery } from "react-icons/gr";


interface HomeProps{
  tweets?:Tweet[]
}


export default function Home(props:HomeProps) {
  const {user} = useCurrentUser()
  const {mutate} = useCreateTweet();
  const [content,setContent] =  useState('')
  const [imageURL,setImgURL] =  useState('')

  const handleCreateTweet = useCallback(()=>{
    mutate({
      content,
      imageURL
      
    })
  },[content,mutate,imageURL])


  const handleInputChangeFile = useCallback((input:HTMLInputElement)=>{
    return async(event:Event)=>{
      event.preventDefault();
      const file:File|null|undefined = input.files?.item(0)
      if(!file) return;

      const {getSignedURLForTweet} = await graphqlClient.request(getSignedURLForTweetQuery,{
        imageName:file.name,
        imageType:file.type,
      })

      if(getSignedURLForTweet){
        toast.loading('Uploading Your Image ...',{id:'2'})
        await axios.put(getSignedURLForTweet,file,{
          headers:{
            'Content-Type':file.type
          }
        })
        toast.success("Upload Completed Successfully",{id:'2'})
        const url = new URL(getSignedURLForTweet) 
        const myFilePath = `${url.origin}${url.pathname}`
        setImgURL(myFilePath) 

      }
    }
  },[])



  const handleImageClick = useCallback(()=>{
    //when button is cleicked this button is called crete sa input tag select the type and a window of fiels is popping out
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept','images/*');


    const hanlderFn = handleInputChangeFile(input)

    input.addEventListener('change',hanlderFn)

    input.click();

  },[handleInputChangeFile])


  

  return (
    <main>
      <Layout>
      <div>
  <div className='border-2 border-r-0 border-l-0 border-slate-50 p-5 hover:bg-slate-50 transition-all cursor-pointer'>
  <div className='grid grid-cols-12 gap-3'>
  <div className='col-span-1'>
    {user?.profileImageURL && (
      <Image className='rounded-full' src={user?.profileImageURL} alt='user-iamge' height={50} width={50} />
    )}
  </div>
  <div className='col-span-11'>
      <textarea value={content} onChange={e=>setContent(e.target.value)} className='border w-full bg-transparent text-xl px-3 border-b border-slate-200' placeholder="What's Happening?" rows={7}></textarea>
      {
        imageURL && <Image src={imageURL} alt='tweet-image' height={200} width={200} />
      }
      <div className='text-xl flex justify-between items-center hover:cursor-pointer hover:text-black'>
        <GrGallery onClick={handleImageClick} />
        <Button onClick={handleCreateTweet} className='bg-black p-2 rounded-full mt-2 text-white text-xs hover:text-black' variant='ghost'><span className='mr-2'>Broadcast</span>  </Button>
      </div>
        
  </div>
  </div>
  </div>
  </div> 
  {
    props.tweets?.map(tweet => tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null)
  }
      </Layout>   
    </main>
  )
}

export const getServerSideProps:GetServerSideProps<HomeProps> = async(context)=>{
  const allTweets = await graphqlClient.request(getAllTweetsQuery);
  return {
    props:{
      tweets: allTweets.getAllTweets as Tweet[]
    }
  }
}
