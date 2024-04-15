const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../shemas/userNew");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const registerController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use2");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });
  res.status(201).json({
    email: newUser.email,
      name: newUser.name,
      birthday: newUser.birthday,
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log("user", user);
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "72h" });
await User.findByIdAndUpdate(user._id, { token });
    const userUpdate = await User.findOne({ email });
    res.json({
      user:{name: user.name, email: user.email, birthday: user.birthday},
    // userUpdate,
    token,
  });
};
module.exports = {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
};
