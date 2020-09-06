const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  img: {
    type: String,
    required: true,
  },
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },
  ],
});

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
  });

  return schema.validate(category);
}

const Category = mongoose.model("Category", categorySchema);

exports.Category = Category;
exports.validateCategory = validateCategory;
