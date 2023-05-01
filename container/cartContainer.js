import { createStore } from "redux";
const cartbtn = () => {
  document.getElementsByTagName("span")[0].innerHTML = localStorage.getItem(
    "cartLength"
  );
};

const reducer = (state = { cartItems: [] }, action) => {
  if (action.type == "ADDITEM") {
    const cartList = JSON.parse(localStorage.getItem("cart"))?.cartItems;
    if (cartList !== undefined) {
      if (cartList.includes(action.fooditem) == false) {
        cartList.push(action.fooditem);
        localStorage.setItem(
          "cart",
          JSON.stringify({
            cartItems: cartList,
          })
        );
        let totalP = 0;

        if (cartList.length > 0) {
          for (let i in cartList) {
            totalP += cartList[i].price;
          }
        }
        localStorage.setItem("totalPrice", totalP);
      }
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: [...state.cartItems, action.fooditem],
        })
      );
      localStorage.setItem("totalPrice", action.fooditem.price);
    }

    localStorage.setItem(
      "cartLength",
      JSON.parse(localStorage.getItem("cart")).cartItems.length
    );

    cartbtn();

    return {
      cartItems: [...state.cartItems, action.fooditem],
    };
  } else if (action.type == "REMOVEITEM") {
    const cartList = JSON.parse(localStorage.getItem("cart"))?.cartItems;
    if (cartList !== undefined) {
      cartList.splice(action.fooditem, 1);
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: cartList,
        })
      );
    }
    let totalP = 0;

    if (cartList.length > 0) {
      for (let i in cartList) {
        totalP += cartList[i].price;
      }
    }
    // localStorage.setItem("totalPrice", totalP);

    localStorage.setItem(
      "cartLength",
      JSON.parse(localStorage.getItem("cart")).cartItems.length
    );

    cartbtn();

    return {
      cartItems: [...state.cartItems],
    };
  }
};

const cartStore = createStore(reducer);

export default cartStore;
