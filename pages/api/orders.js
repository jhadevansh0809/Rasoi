import initDb from "../../helpers/initDB";
import Order from "../../models/Order";

initDb();

export default async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.status(200).json(orders);
};
