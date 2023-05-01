import initDB from "../../helpers/initDB";
import FoodItem from "../../models/FoodItem";

initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllFoodItems(req, res);
      break;
    case "POST":
      await saveFoodItem(req, res);
      break;
    case "PUT":
      await updateFoodItem(req, res);
      break;
  }
};

const getAllFoodItems = async (req, res) => {
  try {
    const items = await FoodItem.find();
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
  }
};

const saveFoodItem = async (req, res) => {
  const { category, name, price, mediaUrl, inStock } = req.body;
  try {
    if (!category || !name || !price || !mediaUrl) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const item = await new FoodItem({
      category,
      name,
      price,
      mediaUrl,
      inStock,
    }).save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
    // console.log(err);
  }
};

const updateFoodItem = async (req, res) => {
  const { item_id, category, name, price, mediaUrl, inStock } = req.body;
  try {
    if (!item_id || !category || !name || !price || !mediaUrl) {
      return res.status(422).json({ error: "Please add all the fields" });
    }

    await FoodItem.findByIdAndDelete({ _id: item_id });

    const item = await new FoodItem({
      _id: item_id,
      category,
      name,
      price,
      mediaUrl,
      inStock,
    }).save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
    console.log(err);
  }
};
