import Link from "next/link";
import Image from "next/image";
import youtube from "../public/images/youtube.png";
import instagram from "../public/images/instagram.png";
import facebook from "../public/images/facebook.png";
import twitter from "../public/images/twitter.png";

const Footer = () => {
  return (
    <div className="w-3/5 m-auto bg-yellow-500 mt-24 mb-12 flex flex-col justify-center items-center p-6 rounded-2xl font-bold sm:w-4/5">
      <div className="text-center my-6">
        <h1 className="ave-font text-4xl my-2">Get In Touch</h1>
        <p>601/4, Civil Lines, Jhansi, Uttar Pradesh</p>
        <p>Phone: +91-98102810209 | info@myrasoi.com</p>
      </div>
      <div className="text-center my-6">
        <h1 className="ave-font text-4xl my-2">Opening Hours</h1>
        <p>Monday - Wednesday 11:00 AM - 2:45 PM & 5:00 PM - 8:45 PM</p>
        <p>Thursday - Sunday: 11:00 AM - 2:45 PM & 5:30 PM - 9:15 PM</p>
      </div>
      <div className="text-center my-6">
        <p>© Copyright 2023 Rasoi | Designed by Devansh</p>
      </div>
      <div className="flex my-5 justify-between items-center md:m-auto md:my-5">
        <Link href="https://www.youtube.com/" target="_blank">
          <Image className="social-logo" src={youtube} alt="youtube logo" />
        </Link>
        <Link href="https://www.instagram.com/" target="_blank">
          <Image className="social-logo" src={instagram} alt="instagram logo" />
        </Link>
        <Link href="https://facebook.com/" target="_blank">
          <Image className="social-logo" src={facebook} alt="facebook logo" />
        </Link>
        <Link href="https://www.twitter.com/" target="_blank">
          <Image className="social-logo" src={twitter} alt="twitter logo" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
