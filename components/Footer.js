import Link from 'next/link'
import Image from 'next/image'
import youtube from '../public/images/youtube.png'
import instagram from '../public/images/instagram.png'
import facebook from '../public/images/facebook.png'
import twitter from '../public/images/twitter.png'

const Footer = () => {
  return (
    <div className='w-3/5 m-auto bg-yellow-500 mt-24 mb-12 flex flex-col justify-center items-center p-6 rounded-2xl font-bold sm:w-4/5'>
      <div className='text-center my-6'>
        <h1 className='ave-font text-4xl my-2'>Get In Touch</h1>
        <p>19405 Promenade Dr., Suite L106, Leesburg, VA 20176</p>
        <p>Phone: 571-333-3300 | info@bhaisahabva.com</p>
      </div>
      <div className='text-center my-6'>
        <h1 className='ave-font text-4xl my-2'>Opening Hours</h1>
        <p>Monday - Wednesday 11:00 AM - 2:30 PM & 4:30 PM - 8:30 PM</p>
        <p>Thursday - Sunday: 11:00 AM - 2:30 PM & 4:30 PM - 9:30 PM</p>
      </div>
      <div className='text-center my-6'>
         <p>© Copyright 2019 - 2023 Rasoi | Designed by Devansh</p>
      </div>
      <div className='flex my-5 justify-between items-center md:m-auto md:my-5'>
        <Link href='https://www.youtube.com/' target='_blank'><Image className='social-logo' src={youtube} alt='youtube logo'/></Link>
        <Link href='https://www.instagram.com/' target='_blank'><Image className='social-logo' src={instagram} alt='instagram logo'/></Link>
        <Link href='https://facebook.com/' target='_blank'><Image className='social-logo' src={facebook} alt='facebook logo'/></Link>
        <Link href='https://www.twitter.com/' target='_blank'><Image className='social-logo' src={twitter} alt='twitter logo'/></Link>
      </div>

      
    </div>
  )
}

export default Footer
