import Stripe from "stripe";
import { v4 as uuidV4 } from "uuid";
import Order from "../../models/Order";
import initDb from "../../helpers/initDB";
// import { parseCookies } from "nookies";
// import cookie from "js-cookie";
// import jwt_decode from "jwt-decode";
import jwt from "jsonwebtoken";

initDb();

const stripe = Stripe(process.env.STRIPE_SECRET);
export default async (req, res) => {
  const { paymentInfo } = req.body;
  const { orderedFoodItems } = req.body;
  const { price } = req.body;
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "you must logged in" });
  }

  try {
    // const cookieuser = parseCookies();
    // const userId = jwt_decode(cookieuser.token).userId;

    const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);

    const newCustomer = await stripe.customers.create({
      email: paymentInfo.email,
      source: paymentInfo.id,
    });

    await stripe.paymentIntents.create(
      {
        currency: "INR",
        amount: price,
        receipt_email: paymentInfo.email,
        customer: newCustomer.id,
        description: `Your order is successful | ${paymentInfo.email}`,
      },
      {
        idempotencyKey: uuidV4(),
      }
    );
    const address = `${paymentInfo.card.address_line1}, ${paymentInfo.card.address_city}, ${paymentInfo.card.address_zip}`;
    await new Order({
      user: userId,
      fooditems: orderedFoodItems,
      email: paymentInfo.email,
      address: address,
      total: price,
    }).save();
    res.status(200).json({ message: "payment was successful" });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "error processing payment" });
  }
};
