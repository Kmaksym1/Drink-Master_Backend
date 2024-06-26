const { Schema, model } = require("mongoose");
const Joi = require("joi");

const recepiesSchema = new Schema({
  drink: String,
  drinkAlternate: String,
  tags: String,
  video: String,
  category: String,
  IBA: String,
  alcoholic: String,
  glass: String,
  description: String,
  instructions: String,
  instructionsES: String,
  instructionsDE: String,
  instructionsFR: String,
  instructionsIT: String,
  instructionsRU: String,
  instructionsPL: String,
  instructionsUK: String,
  drinkThumb: String,
  // ingredients: [{ title: String, measure: String, ingredientId: ObjectId }],
  ingredients: [],
  shortDescription: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User", // назва колекції з якої id
    //   required: true,
  },
});

const schema = Joi.object({
  drink: Joi.string().required(),
  category: Joi.string().required(),
  alcoholic: Joi.string().required(),
  glass: Joi.string().required(),
  description: Joi.string(),
  instructions: Joi.string(),
  drinkThumb: Joi.string().required(),
  ingredients: Joi.array(),
  shortDescription: Joi.string().required(),
  owner: Joi.object(),
});

const recepiesModel = model("recepies", recepiesSchema);

module.exports = {
    recepiesModel,
  schema,
};
