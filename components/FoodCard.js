import React, { useState } from "react";
import { useDispatch } from "react-redux";

const FoodCard = ({ item }, { cartbtn }) => {
  const dispatch = useDispatch();
  const [addedOrNot, setAddedOrNot] = useState(false);
  return (
    <div className="w-full max-w-sm bg-yellow-500 rounded-2xl m-4">
      <img
        className="p-6 rounded-t-lg max-h-60 min-w-full"
        src={item.mediaUrl}
        alt={item.name}
      />
      <div className="px-5 pb-5">
        <h5 className="text-lg font-semibold tracking-tight text-black">
          {item.name}
        </h5>
        <div className="flex items-center justify-between py-2">
          <span className="text-2xl font-bold text-black">
            &#8377;{item.price}
          </span>
          {item.inStock ? (
            typeof window !== "undefined" &&
            localStorage.getItem(item.name) !== "added" ? (
              <button
                id="button"
                className="btn btn-green"
                onClick={(e) => {
                  dispatch({
                    type: "ADDITEM",
                    fooditem: {
                      name: item.name,
                      price: item.price,
                      mediaUrl: item.mediaUrl,
                    },
                  });

                  setAddedOrNot(true);

                  localStorage.setItem(item.name, "added");
                }}
              >
                Add to cart
              </button>
            ) : (
              <button
                id="button"
                className="btn btn-green bg-red-400 hover:bg-red-400"
                disabled
              >
                Already in cart
              </button>
            )
          ) : (
            <button
              id="button"
              className="btn btn-green bg-red-400 hover:bg-red-400"
              disabled
            >
              Not in stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
