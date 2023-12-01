import { graphqlClient } from "@/clients/api"
import { getCurrentUserQuery } from "@/graphql/query/user"
import { useQuery } from "@tanstack/react-query"

export const useCurrentUser = ()=>{
    //custom hook that gives a user if a user is presetnt
    const query = useQuery({
        queryKey:["current-user"], //this si the key that stores the cache of teh user
        queryFn:()=>graphqlClient.request(getCurrentUserQuery)

    })
    return {...query,user:query.data?.getCurrentUser}
}