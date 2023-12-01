import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return <div className={inter.className}>
    <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId='878508288770-bo8t81sj1p1v759ms7un30c54euf2iug.apps.googleusercontent.com'>
      <Component {...pageProps} />
      <Toaster />
      <ReactQueryDevtools />
    </GoogleOAuthProvider>
    </QueryClientProvider>
    
  </div> 
}
;