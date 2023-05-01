import React from 'react'
import Image from 'next/image'
import t1 from '../public/images/t1.png'
import t2 from '../public/images/t2.png'
import t3 from '../public/images/t3.png'
import t4 from '../public/images/t4.png'

const Welcome = () => {
  return (
    <>
    <h1 className='heading ave-font mt-10'>Be Our Guest!</h1>
    <div className='welcome-container flex h-[350px] w-4/5 m-auto overflow-auto my-10 p-5'>
    <Image className='welcome-img' src={t1}></Image>
    <Image className='welcome-img' src={t2}></Image>
    <Image className='welcome-img' src={t3}></Image>
    <Image className='welcome-img' src={t4}></Image>
  </div>
  </>
  )
}

export default Welcome
