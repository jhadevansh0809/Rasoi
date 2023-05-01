import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { Provider } from 'react-redux';
import cartStore from '../container/cartContainer';
import { HydrationProvider, Client } from "react-hydration-provider";


export default function App({ Component, pageProps }: AppProps) {

  return (
    <HydrationProvider>
      <Client>
        <Provider store={cartStore}>
          <Navbar/>
          <Component {...pageProps}/>
        </Provider>
      </Client>
    </HydrationProvider>

  )
}
