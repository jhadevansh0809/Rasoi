import React from "react";
import moment from "moment/moment";

const OrderItem = ({ order }) => {
  return (
    <>
      <style jsx>{`
        h3 {
          color: black;
          font-size: 18px;
          font-weight: bold;
          text-decoration: underline;
        }
        h4 {
          color: black;
          font-size: 15px;
          font-weight: bold;
        }
      `}</style>
      <div className="bg-yellow-500 w-4/5 m-auto my-5 rounded-lg p-4">
        <div className="mb-2">
          <h2 className="text-red-600 font-bold">
            {moment(order.createdAt).format("YYYY-MM-DD, hh:mm, A")}
          </h2>
        </div>
        <div>
          <h3>Order ID</h3>
          <p>{order._id}</p>
        </div>
        <div className="my-2">
          <h3>User ID</h3>
          <p>{order.user}</p>
        </div>
        <div>
          <h3>Email:</h3>
          <p>{order.email}</p>
        </div>
        <div>
          <h3>Address:</h3>
          <p>{order.address}</p>
        </div>
        <h3 className="mt-4 mb-2 underline">Order</h3>
        <div className="flex flex-col">
          {order.fooditems.map((fooditem) => {
            return (
              <div className="flex" key={fooditem._id}>
                <h4>{fooditem.name}</h4>
                <h4 className="mx-16">&#8377;{fooditem.price}/-</h4>
                <h4>Count: {fooditem.count}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OrderItem;
