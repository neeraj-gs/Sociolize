import {GraphQLClient} from 'graphql-request'

const isClient = typeof window !== 'undefined' //it is a typecheck , if server side renderd lcient is false, if cleint send token elase dont send


export const graphqlClient = new GraphQLClient('https://d1rb2bxxlg2ohh.cloudfront.net/graphql',{
    headers:()=>({
        Authorization:isClient ? 
        `Bearer ${window.localStorage.getItem("__sociolize_token")}`
        : "",
    })
})