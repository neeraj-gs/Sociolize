import {GraphQLClient} from 'graphql-request'

const isClient = typeof window !== 'undefined' //it is a typecheck , if server side renderd lcient is false, if cleint send token elase dont send


export const graphqlClient = new GraphQLClient('http://localhost:8000/graphql',{
    headers:()=>({
        Authorization:isClient ? 
        `Bearer ${window.localStorage.getItem("__sociolize_token")}`
        : "",
    })
})