import React from "react";
import AdminFoodCard from "../../components/AdminFoodCard";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import baseUrl from "../../helpers/baseUrl";

const menu = ({ fooditems }) => {
  const cookieuser = parseCookies();
  const token = cookieuser.token ? cookieuser.token : null;

  let admin = null;
  if (token) {
    let decoded_token = jwt_decode(token);
    admin = decoded_token.admin;
  }

  const breakfastItems = fooditems.filter((item) => {
    return item["category"] == "Breakfast";
  });

  const lunchItems = fooditems.filter((item) => {
    return item["category"] == "Lunch";
  });

  const dinnerItems = fooditems.filter((item) => {
    return item["category"] == "Dinner";
  });

  // console.log(breakfastItems);
  // console.log(lunchItems);
  // console.log(dinnerItems);

  const moveTo = (e) => {
    const id = e.target.id;
    document.querySelector(`#meal${id}`).scrollIntoView({
      behavior: "smooth",
    });
  };
  if (admin) {
    return (
      <div className="menu-container w-4/5 m-auto">
        <h1 className="heading my-10 ave-font">Menu</h1>
        <div class="flex justify-center rounded-lg text-lg" role="group">
          <button
            onClick={moveTo}
            class="bg-white text-green-600 hover:bg-green-600 hover:text-white border border-r-0 border-green-600 rounded-l-lg px-4 py-2 mx-0 outline-none focus:shadow-outline"
            id="1"
          >
            Breakfast
          </button>

          <button
            onClick={moveTo}
            class="bg-white text-green-600 hover:bg-green-600 hover:text-white border border-green-600  px-4 py-2 mx-0 outline-none focus:shadow-outline"
            id="2"
          >
            Lunch
          </button>

          <button
            onClick={moveTo}
            class="bg-white text-green-600 hover:bg-green-600 hover:text-white border border-l-0 border-green-600 rounded-r-lg px-4 py-2 mx-0 outline-none focus:shadow-outline"
            id="3"
          >
            Dinner
          </button>
        </div>

        <h1 className="font-bold text-center mt-12 mb-6 text-2xl" id="meal1">
          Breakfast
        </h1>

        <div className="flex flex-wrap justify-center items-center mb-10">
          {breakfastItems.map((item) => {
            return <AdminFoodCard item={item} key={item._id} />;
          })}
        </div>

        <h1 className="font-bold text-center mt-12 mb-6 text-2xl" id="meal2">
          Lunch
        </h1>
        <div className="flex flex-wrap justify-center items-center mb-10">
          {lunchItems.map((item) => {
            return <AdminFoodCard item={item} key={item._id} />;
          })}
        </div>

        <h1 className="font-bold text-center mt-12 mb-6 text-2xl" id="meal3">
          Dinner
        </h1>
        <div className="flex flex-wrap justify-center items-center mb-10">
          {dinnerItems.map((item) => {
            return <AdminFoodCard item={item} key={item._id} />;
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="text-center font-bold my-20">
      You are not authorized for this page!
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${baseUrl}/api/fooditems`);
  const data = await res.json();
  console.log(data);
  return {
    props: {
      fooditems: data,
    },
  };
}

export default menu;
