import initDB from "../../helpers/initDB";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

initDB();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: "please add all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "user doesn't exists with that email" });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
      const token = jwt.sign(
        {
          userId: user._id,
          username: user.name,
          email: user.email,
          admin: user.admin,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      const { name } = user;
      const { admin } = user;
      res.status(201).json({ token, name, admin });
    } else {
      return res.status(401).json({ error: "incorrect email or password" });
    }
  } catch (err) {
    console.log(err);
  }
};
