import React, { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import baseUrl from "../../helpers/baseUrl";

const Additem = () => {
  const cookieuser = parseCookies();
  const token = cookieuser.token ? cookieuser.token : null;

  let admin = null;
  if (token) {
    let decoded_token = jwt_decode(token);
    admin = decoded_token.admin;
  }

  const [category, setCategory] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [mediaUrl, setMediaUrl] = useState("");
  const [inStock, setInStock] = useState(false);
  const router = useRouter();

  const addFoodItem = async (e) => {
    e.preventDefault();
    const res = await fetch(`${baseUrl}/api/fooditems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        name,
        price,
        mediaUrl,
        inStock,
      }),
    });

    const res2 = await res.json();
    if (res2.error) {
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
      toast.success("Fooditem Added Successfully!,Redirecting to Menu Page.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push("/admin/menu");
      }, 4000);
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
      {admin ? (
        <section class="bg-yellow-500 w-2/5 m-auto my-10 rounded-2xl lg:w-1/2 md:w-2/3 sm:w-4/5 md:py-4">
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full md:mt-0 sm:max-w-md xl:p-0">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-black">
                  Add Item
                </h1>

                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={(e) => addFoodItem(e)}
                >
                  <div>
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-black"
                    >
                      Select an option
                    </label>
                    <select
                      id="categories"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option selected>Choose a category</option>
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dinner">Dinner</option>
                    </select>
                  </div>
                  <div>
                    <label
                      for="name"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Fooditem Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter fooditem name..."
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      for="mediaUrl"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Image Link
                    </label>
                    <input
                      type="text"
                      name="mediaUrl"
                      id="mediaUrl"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={mediaUrl}
                      onChange={(e) => setMediaUrl(e.target.value)}
                    />
                  </div>
                  <div class="flex items-center">
                    <input
                      id="checkbox"
                      type="checkbox"
                      onChange={(e) => {
                        {
                          e.target.checked
                            ? setInStock(true)
                            : setInStock(false);
                        }
                      }}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="checkbox"
                      class="ml-2 text-sm font-medium text-black"
                    >
                      In Stock
                    </label>
                  </div>
                  <button type="submit" className="btn btn-green">
                    Add Item
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="text-center font-bold my-20">
          You are not authorized for this page!
        </div>
      )}
    </>
  );
};

export default Additem;
