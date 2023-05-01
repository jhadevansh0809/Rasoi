import React from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminFoodCard = ({ item }) => {
  const router = useRouter();

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
          <button
            id="button"
            onClick={() => {
              localStorage.setItem("toEdit", JSON.stringify(item));
              router.push(`/admin/fooditems/{item.id}`);
            }}
            className="btn btn-green"
          >
            Edit Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminFoodCard;
