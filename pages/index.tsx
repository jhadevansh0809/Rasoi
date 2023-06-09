import Head from 'next/head'
import { Inter } from 'next/font/google'
import Carousel from '../components/Carousel'
import Blend from '../components/Blend'
import Footer from '../components/Footer'

import dynamic from "next/dynamic";

const MyHeyUser= dynamic(() => import("../components/HeyUser"), {
ssr: false,
});





const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <Head>
        <title>Rasoi</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href='../public/images/samosa.png' />
      </Head>
      <main>
        <MyHeyUser/>
        <Carousel/>
        <div className='my-24 offer-container p-10 saturate-50 h-96 ave-font text-2xl text-white flex flex-col justify-center items-center'>
          <p>With us, you can taste the PANEER BUTTER MASALA</p>
          <p className='py-2'>“DIWALI SPECIAL” ALL YOU CAN EAT @ &#8377;140!!</p>
          <p>This Friday, Saturday & Sunday</p>
        </div>
        <Blend/>
        <Footer/>
      </main>
    </>
  )
}
