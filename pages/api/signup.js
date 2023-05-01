import initDB from "../../helpers/initDB";
import User from "../../models/User";
import bcrypt from "bcryptjs";

initDB();

export default async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;
  console.log({ obj: { name, email, password, confirmpassword } });
  try {
    if (!name || !email || !password || !confirmpassword) {
      return res.status(422).json({ error: "please add all the fields" });
    }
    if (password !== confirmpassword) {
      return res.status(422).json({ error: "passwords didn't match" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(422)
        .json({ error: "user already exists with that email" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();
    console.log("Done");
    res.status(201).json({ message: "signup success" });
  } catch (err) {
    console.log(err);
  }
};
