import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../../helpers/baseUrl";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const userLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const res2 = await res.json();
    console.log(res2);
    if (res2.error || !res2.admin) {
      // console.log(res2.admin);
      toast.error("Some problem occured!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // console.log("Success!");
      cookie.set("token", res2.token);
      cookie.set("username", res2.name);
      router.push("/admin/orders");
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <section class="bg-yellow-500 w-2/5 m-auto my-10 rounded-2xl lg:w-1/2 md:w-2/3 sm:w-4/5">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-black">
                Admin Login Panel
              </h1>
              <form
                class="space-y-4 md:space-y-6"
                onSubmit={(e) => userLogin(e)}
              >
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-black"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your email..."
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div class="flex items-center justify-between">
                  <a
                    href="#"
                    class="text-sm font-bold text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button type="submit" class="btn btn-green">
                  Sign in
                </button>
                <p class="text-sm text-black">
                  Don’t have an account yet?{" "}
                  <Link
                    href="/signup"
                    class="font-bold text-black hover:underline "
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
