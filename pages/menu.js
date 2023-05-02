import React from "react";
import Welcome from "../components/Welcome";
import FoodCard from "../components/FoodCard";
import baseUrl from "../helpers/baseUrl";

const Menu = ({ fooditems }) => {
  const breakfastItems = fooditems.filter((item) => {
    return item["category"] == "Breakfast";
  });

  const lunchItems = fooditems.filter((item) => {
    return item["category"] == "Lunch";
  });

  const dinnerItems = fooditems.filter((item) => {
    return item["category"] == "Dinner";
  });

  const moveTo = (e) => {
    const id = e.target.id;
    document.querySelector(`#meal${id}`).scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div>
      <Welcome />
      <div className="ord-container text-center my-10 bg-yellow-500 py-10">
        <h1 className="heading ave-font mb-10">Accepting Orders</h1>
        <p>11:00 AM - 2:45 PM</p>
        <p>5:00 PM - 8:45 PM</p>
        <p>601/4, Civil Lines, Jhansi, Uttar Pradesh </p>
        <p>+91-98102810209</p>
      </div>

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
            return <FoodCard item={item} key={item._id} />;
          })}
        </div>

        <h1 className="font-bold text-center mt-12 mb-6 text-2xl" id="meal2">
          Lunch
        </h1>
        <div className="flex flex-wrap justify-center items-center mb-10">
          {lunchItems.map((item) => {
            return <FoodCard item={item} key={item._id} />;
          })}
        </div>

        <h1 className="font-bold text-center mt-12 mb-6 text-2xl" id="meal3">
          Dinner
        </h1>
        <div className="flex flex-wrap justify-center items-center mb-10">
          {dinnerItems.map((item) => {
            return <FoodCard item={item} key={item._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${baseUrl}/api/fooditems`);
  const data = await res.json();
  // console.log(data);
  return {
    props: {
      fooditems: data,
    },
  };
}

export default Menu;
