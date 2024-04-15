const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

// const emailRegexp = /^\w+ ([\. - ]?\w+) *@\w+ ([\. - ]? \w+) *(1. \w{2, 3}) +$/;
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      required: [true, "Set name for your account"],
    },
    birthday: {
      type: String,
      minLength: 10,
    },
    email: {
      type: String,
      default: "",
      match: emailRegexp,
      unique: true,
      required: [true, "Email is Required"],
    },
    password: {
      type: String,
      minLength: 2,
      required: [true, "Set password"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    birthday: Joi.string().min(10).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  schemas,
  User,
};
