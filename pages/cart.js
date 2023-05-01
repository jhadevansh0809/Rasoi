import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import StripeCheckout from "react-stripe-checkout";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../helpers/baseUrl";

if (typeof window !== "undefined") {
  window.onload = (event) => {
    const curr = parseInt(localStorage.getItem("totalPrice"));
    let totalP = 0;

    const cartList = JSON.parse(localStorage.getItem("cart"))?.cartItems;

    if (cartList.length > 0) {
      for (let i in cartList) {
        totalP += cartList[i].price;
      }
    }

    localStorage.setItem("totalPrice", totalP);
  };
}

const Cart = () => {
  const router = useRouter();

  const { token } = parseCookies();

  const [payablePrice, setPayablePrice] = useState(
    localStorage.getItem("totalPrice")
  );

  const priceToPay = (price) => {
    setPayablePrice(price);
  };

  // console.log(token);

  const cartItems =
    typeof window !== "undefined" && localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).cartItems
      : [];

  // console.log(cartItems);

  const orderItems = [];

  cartItems.forEach((item, index) => {
    const food = { name: item.name, price: item.price, count: 1 };
    orderItems.push(food);
  });

  // console.log(orderItems);

  localStorage.setItem(
    "orderDetail",
    JSON.stringify({ orderItems: orderItems })
  );

  const handleCheckout = async (paymentInfo) => {
    console.log(paymentInfo);
    const res = await fetch(`${baseUrl}/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        paymentInfo,
        orderedFoodItems: JSON.parse(localStorage.getItem("orderDetail"))
          .orderItems,
        price: payablePrice * 100,
      }),
    });
    const res2 = await res.json();
    // console.log(res2);
    // router.push("/");
    if (res2.error) {
      toast.error(
        "Please login to place an order! Wait ,redirecting you to the login page",
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } else {
      toast.success("Order Placed Successfully!", {
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
        router.push("/");
      }, 4000);
    }
  };


  return (
    <>
      {" "}
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
      <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 bg-yellow-500 m-auto my-10 rounded-2xl">
        <h2 className="text-xl font-bold">Your cart</h2>

        {cartItems.length !== 0 ? (
          <div className="cartItemInfo">
            <ul className="flex flex-col">
              {cartItems.map((item) => {
                return (
                  <CartItem
                    item={item}
                    key={item._id}
                    priceToPay={priceToPay}
                  />
                );
              })}
            </ul>
            <div className="space-y-1 text-right amountInfo">
              <p>
                Total amount:
                <span className="font-semibold">&#8377;</span>
                <span className="font-semibold" id="totalPriceSpan">
                  {typeof window !== "undefined" &&
                    localStorage.getItem("totalPrice")}
                </span>
              </p>
              <p className="text-sm text-black font-bold">
                Not including taxes and shipping costs
              </p>
            </div>
            <div className="flex justify-end space-x-4 mt-2">
              {token ? (
                <StripeCheckout
                  name="Rasoi"
                  amount={payablePrice * 100}
                  currency="INR"
                  shippingAddress={true}
                  zipCode={true}
                  stripeKey="pk_test_51MyX3gSImGoQE5RHi9dHg2vs9O6AogEPUjMe1w721l3RpT0vTigMg1zCq14ju8YJm3275Y41p62rtaqW3LUX3ZcR00l4H9N4dX"
                  token={(paymentInfo) => handleCheckout(paymentInfo)}
                >
                  <button
                    type="button"
                    className="px-6 py-2 rounded-md bg-green-600 hover:bg-green-500"
                  >
                    Checkout
                  </button>
                </StripeCheckout>
              ) : (
                <button
                  type="button"
                  disabled
                  className="px-6 py-2 rounded-md bg-blue-500"
                >
                  Login to Checkout
                </button>
              )}
            </div>
          </div>
        ) : (
          <h1>Cart is empty:/</h1>
        )}
      </div>
    </>
  );
};

export default Cart;
