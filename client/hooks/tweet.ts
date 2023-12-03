import { graphqlClient } from "@/clients/api"
import { User } from "@/gql/graphql";
import { getAllTweetsQuery } from "@/graphql/query/tweet"
import { useQuery } from "@tanstack/react-query"


interface Tweet {
    id: string;
    content: string;
    imageURL?: string;

    author: User
}

export const useGetAllTweets = ()=>{
    const query = useQuery({
        queryKey:["all-tweets"],
        queryFn: () => graphqlClient.request(getAllTweetsQuery:Tweet[])
    })
    return {...query,tweets:query.data?.getAllTweets}
}