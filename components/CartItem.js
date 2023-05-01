import { useState } from "react";
import { useDispatch } from "react-redux";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const priceSpan = () => {
    document.getElementById("totalPriceSpan").innerHTML = localStorage.getItem(
      "totalPrice"
    );
  };

  const deleteItem = (data, itemName) => {
    let filterItem = data.filter(function (item) {
      return item.name !== itemName;
    });
    return filterItem;
  };

  const [foodItemCount, setFoodItemCount] = useState(1);

  const [curItemPrice, setCurItemPrice] = useState(props.item.price);

  const increaseCount = () => {
    setFoodItemCount(foodItemCount + 1);
    setCurItemPrice(curItemPrice + props.item.price);
    const curr = parseInt(localStorage.getItem("totalPrice"));
    localStorage.setItem("totalPrice", curr + props.item.price);

    props.priceToPay(curr + props.item.price);

    let orderFoodItems = JSON.parse(localStorage.getItem("orderDetail"))
      .orderItems;

    orderFoodItems = deleteItem(orderFoodItems, props.item.name);

    const newItem = {
      name: props.item.name,
      price: props.item.price,
      count: foodItemCount + 1,
    };

    localStorage.setItem(
      "orderDetail",
      JSON.stringify({ orderItems: [...orderFoodItems, newItem] })
    );

    priceSpan();
  };

  const decreaseCount = () => {
    if (foodItemCount == 1) {
      setFoodItemCount(1);
    } else {
      setFoodItemCount(foodItemCount - 1);
      setCurItemPrice(curItemPrice - props.item.price);
      const curr = parseInt(localStorage.getItem("totalPrice"));
      localStorage.setItem("totalPrice", curr - props.item.price);

      props.priceToPay(curr - props.item.price);

      let orderFoodItems = JSON.parse(localStorage.getItem("orderDetail"))
        .orderItems;

      orderFoodItems = deleteItem(orderFoodItems, props.item.name);

      const newItem = {
        name: props.item.name,
        price: props.item.price,
        count: foodItemCount - 1,
      };

      localStorage.setItem(
        "orderDetail",
        JSON.stringify({ orderItems: [...orderFoodItems, newItem] })
      );

      priceSpan();
    }
  };

  const removeItem = (e) => {
    dispatch({ type: "REMOVEITEM", fooditem: props.item });
    localStorage.setItem(props.item.name, "removed");
    const curr = parseInt(localStorage.getItem("totalPrice"));
    const price = parseInt(
      e.target.closest(".itemContainer").querySelector(".itemprice").innerHTML
    );
    localStorage.setItem("totalPrice", curr - price);
    props.priceToPay(curr - price);
    e.target.closest(".itemContainer").style = "display:none";

    let orderFoodItems = JSON.parse(localStorage.getItem("orderDetail"))
      .orderItems;

    orderFoodItems = deleteItem(orderFoodItems, props.item.name);

    localStorage.setItem(
      "orderDetail",
      JSON.stringify({ orderItems: [...orderFoodItems] })
    );

    priceSpan();
  };

  return (
    <div>
      <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
        <div className="flex w-full space-x-2 sm:space-x-4 itemContainer">
          <img
            className="flex-shrink-0 object-cover w-32 h-32 dark:border-transparent rounded outline-none sm:w-32 xs:h-36  dark:bg-gray-500"
            src={props.item.mediaUrl}
            alt={props.item.name}
          />
          <div className="flex flex-col justify-between w-full pb-4">
            <div className="flex justify-between w-full pb-2 space-x-2">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold leading-snug sm:pr-8 mb-4 xxs:mb-1.5 xxs:text-md">
                  {props.item.name}
                </h3>
                <div className="flex flex-row w-20 h-8 rounded-lg relative bg-transparent mt-1">
                  <button
                    onClick={decreaseCount}
                    id="decrement"
                    className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                  >
                    <span className="m-auto text-xl font-thin">−</span>
                  </button>
                  <input
                    type="number"
                    className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
                    name="custom-input-number"
                    value={foodItemCount}
                  ></input>
                  <button
                    onClick={increaseCount}
                    id="increment"
                    className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                  >
                    <span className="m-auto text-xl font-thin">+</span>
                  </button>
                </div>
              </div>
              <div className="text-right price flex">
                <p className="text-lg font-semibold">&#8377;</p>
                <p className="text-lg font-semibold itemprice">
                  {curItemPrice}
                </p>
              </div>
            </div>
            <div className="text-sm divide-x mt-2 sm:mt-0">
              <button
                onClick={removeItem}
                type="button"
                className="flex items-center px-2.5 py-1.5 space-x-1 text-red-600 border border-red-600 hover:text-black  hover:border-black rounded-xl  font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 fill-current"
                >
                  <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                  <rect width="32" height="200" x="168" y="216"></rect>
                  <rect width="32" height="200" x="240" y="216"></rect>
                  <rect width="32" height="200" x="312" y="216"></rect>
                  <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                </svg>
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default CartItem;
