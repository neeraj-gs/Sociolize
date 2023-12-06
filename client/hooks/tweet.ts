import { graphqlClient } from "@/clients/api"
import { CreateTweetData } from "@/gql/graphql"
import { createTweetMutation } from "@/graphql/mutation/tweet"
import { getAllTweetsQuery } from "@/graphql/query/tweet"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCreateTweet = ()=>{
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn:(payload:CreateTweetData)=> graphqlClient.request(createTweetMutation,{payload}),
        onMutate:(payload)=> toast.loading("Broadcasting your Post ... ",{id:"1"}),
        onSuccess: async(payload)=> {
            //@ts-ignore
            await queryClient.invalidateQueries(["allTweets"])
            toast.success('Broadcasted your post Successfully',{id:"1"})
        }
    })
    return mutation
}
//react query when mutaio is successed all tweets are refetched from server


export const useGetAllTweets = ()=>{
    const query = useQuery({
        queryKey: ['allTweets'],
        queryFn: ()=> graphqlClient.request(getAllTweetsQuery)
    })
    return {...query,tweets:query.data?.getAllTweets}
}