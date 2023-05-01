import Image from "next/image"
import banner from '../public/images/banner.jpg'

const About = () => {
  return (
    <>
    <h1 className="my-10 heading">About Us</h1>
    <div className="mb-10 flex flex-col justify-center items-center m-auto rounded-2xl w-1/2 md:w-3/4 sm:w-4/5">
      <div className="w-full">
        <Image src={banner} className="w-full contrast-75 saturate-150"></Image>
      </div>
      <div className="p-20 text-center ave-font bg-yellow-500 sm:p-10">
        <p>Our Group is a people-oriented company and it strives to create a vibrant and open work environment that is employee-friendly and socially responsible. It has a team of diligent and proficient individuals, who collectively contribute in developing and delivering the very best.The company has created a culture that emphasizes customer centricity, teamwork, and continuous process improvement. Its global work culture provides opportunities for constant learning and growth. Well-structured training modules are in place to ensure constant honing of skills to meet the dynamic requirements of the industry.</p>
        <p>--Team Rasoi</p>
      </div>
    </div>
    </>
  )
}

export default About
