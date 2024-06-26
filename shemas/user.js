// const { Schema, model } = require("mongoose");
// const Joi = require("joi");
// const crypto = require("node:crypto");
// // const { strict } = require("node:assert");
// // const { string } = require("joi");
// require("dotenv").config();
// // const { log, timeLog } = require("node:console");

// // eslint-disable-next-line no-useless-escape
// const emailRegexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;


// const userSchema = new Schema(
//   {
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       match: [emailRegexp, "Invalid email format"],
//       unique: true,
//     },
//     password: {
//       type: String,
//       minLength: 6,
//       required: [true, "Set password for user"],
//     },
//     subscription: {
//       type: String,
//       enum: ["starter", "pro", "business"],
//       default: "starter",
//     },
//     avatarURL: {
//       type: String,
//       require: true,
//     },
//     token: String,
//   },
//   {
//     versionKey: false,
//     timestamps: true,
//   }
// );

// const makeHash = async (password) => {
//   return new Promise((resolve, reject) => {
//     crypto.scrypt(password, process.env.SALT, 64, (err, hash) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(hash.toString("hex"));
//     });
//   });
// };

// userSchema.methods.setPassword = async function (password) {
//   try {
//     this.password = await makeHash(password);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// userSchema.methods.validPassword = async function (password) {
//   try {
//     const hash = await makeHash(password);
//     return hash === this.password;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// const signUpSchema = Joi.object({
  
//   email: Joi.string().pattern(emailRegexp).required(),
//   password: Joi.string().min(6).required(),
// });
// const logInSchema = Joi.object({
//   email: Joi.string().pattern(emailRegexp).required(),
//   password: Joi.string().min(6).required(),
// });

// const schemas = {
//   signUpSchema,
//   logInSchema,
// };
// const User = model("User", userSchema);

// module.exports = {
//   User,
//   schemas,
// };
