import Link from "next/link";
import Image from "next/image";
import logo from "../public/images/logo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const router = useRouter();
  const cookieuser = parseCookies();
  const user = cookieuser.username ? cookieuser.username : "";

  const token = cookieuser.token ? cookieuser.token : null;

  let admin = null;
  if (token) {
    let decoded_token = jwt_decode(token);
    admin = decoded_token.admin;
  }
  const showNavLinks = (e) => {
    const ele = document.getElementById("navLinks").classList;
    ele.toggle("sm:hidden");
    ele.add("sm:flex-col", "sm:bg-white", "sm:w-screen", "sm:my-20");

    let ele2 = document.getElementById("svgpath");
    let d = ele2.getAttribute("d");
    //    console.log(d);
    if (d === "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5")
      ele2.setAttribute("d", "M6 18L18 6M6 6l12 12");
    else ele2.setAttribute("d", "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5");
  };

  const hideLinks = (e) => {
    const ele = document.getElementById("navLinks").classList;
    ele.toggle("sm:hidden");
    let ele2 = document.getElementById("svgpath");
    let d = ele2.getAttribute("d");
    ele2.setAttribute("d", "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5");
  };

  return (
    <>
      <div className="bg-white nav h-20 shadow-md text-black font-bold flex justify-evenly items-center sm:justify-between sm:px-3 sm:flex-col">
        <div className="w-[160px] flex items-center sm:absolute top-4 left-4 hover:scale-110 transition duration-300 ease-in-out">
          <Image src={logo} className="w-[40px] h-full"></Image>
          <h1 className="text-[30px] text-green-700 font-extrabold italic">
            Rasoi
          </h1>
        </div>
        <ul
          className="text-sm w-2/5 flex justify-between items-center md:w-4/5 lg:w-3/5 sm:hidden z-10"
          id="navLinks"
        >
          {!admin ? (
            <>
              <Link href="/">
                <li onClick={hideLinks} className="sm:my-5">
                  Home
                </li>
              </Link>
              <Link href="/menu">
                <li onClick={hideLinks} className="sm:my-5">
                  Menu
                </li>
              </Link>
              <Link href="/about">
                <li onClick={hideLinks} className="sm:my-5">
                  About Us
                </li>
              </Link>
              <Link href="/contact">
                <li onClick={hideLinks} className="sm:my-5">
                  Contact Us
                </li>
              </Link>
            </>
          ) : (
            <>
              <Link href="/admin/orders">
                <li onClick={hideLinks} className="sm:my-5">
                  Orders
                </li>
              </Link>
              <Link href="/admin/menu">
                <li onClick={hideLinks} className="sm:my-5">
                  Menu
                </li>
              </Link>
              <Link href="/admin/additem">
                <li onClick={hideLinks} className="sm:my-5">
                  Add Item
                </li>
              </Link>
            </>
          )}

          {user ? (
            <li
              onClick={() => {
                cookie.remove("token");
                cookie.remove("username");
                if (admin) router.push("/admin/login");
                else router.push("/login");
              }}
              className="sm:my-5 btn"
            >
              Logout
            </li>
          ) : (
            <>
              <Link href="/login">
                <li onClick={hideLinks} className="sm:my-5 btn">
                  LogIn
                </li>
              </Link>
              <Link href="/signup">
                <li onClick={hideLinks} className="sm:my-5 btn">
                  SignUp
                </li>
              </Link>
            </>
          )}
        </ul>
        <div className="w-[50px] ml-4 sm:absolute sm:top-[25px] sm:right-20">
          <Link
            href="/cart"
            onClick={() => (window.location.href = "/cart")}
            className="flex"
          >
            <AiOutlineShoppingCart className="text-[30px] hover:scale-125 transition duration-100 ease-in-out" />
            <span id="myCartPopUp">{localStorage.getItem("cartLength")}</span>
          </Link>
        </div>
      </div>

      <svg
        onClick={showNavLinks}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-11 h-11 hidden absolute top-5 right-4 sm:block cursor-pointer hover:scale-125 trasition duration-100 ease-in-out"
      >
        <path
          id="svgpath"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </>
  );
};

export default Navbar;
