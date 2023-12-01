import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { GoogleOAuthProvider } from '@react-oauth/google'


const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return <div className={inter.className}>
    <GoogleOAuthProvider clientId='878508288770-bo8t81sj1p1v759ms7un30c54euf2iug.apps.googleusercontent.com'>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  </div> 
}
