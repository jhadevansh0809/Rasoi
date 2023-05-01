import React from "react";
import OrderItem from "../../components/OrderItem";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import baseUrl from "../../helpers/baseUrl";

const orders = ({ orders }) => {
  const cookieuser = parseCookies();
  const token = cookieuser.token ? cookieuser.token : null;

  let admin = null;
  if (token) {
    let decoded_token = jwt_decode(token);
    admin = decoded_token.admin;
  }

  // console.log(orders);
  return (
    <div>
      {admin ? (
        orders.map((order) => {
          return <OrderItem order={order} key={order._id} />;
        })
      ) : (
        <div className="text-center font-bold my-20">
          You are not authorized for this page!
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${baseUrl}/api/orders`);
  const data = await res.json();
  // console.log(data);
  return {
    props: {
      orders: data,
    },
  };
}

export default orders;
