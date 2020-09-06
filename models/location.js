const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const locationSchema = new mongoose.Schema({
  location: String,
});

function validateLocation(req) {
  const schema = Joi.object({
    location: Joi.string().required(),
  });

  return schema.validate(req);
}

const Location = mongoose.model("Location", locationSchema);

exports.Location = Location;
exports.validateLocation = validateLocation;
