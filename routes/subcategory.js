const express = require("express");
const mongoose = require("mongoose");

// * NPM Packages

// * Models
const { Subcategory, validateSubcategory } = require("../models/subcategory");
const { Category, validateCategory } = require("../models/category");

// * Functions

// * Middleware

const router = express.Router();

// * Requests -->

// * Get all subcategories
// * Done
router.get("/all", async (req, res) => {
  try {
    const subcategories = await Subcategory.find({}).exec();

    res.json({ subcategories });
  } catch (error) {
    console.log("Error occured here \n", error);
    res.status(400).send("Something went wrong.");
  }
});

// * Get a single subcategory
// * Done
router.get("/:id", async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id)
      .populate("deals parentCategory")
      .exec();

    if (!subcategory) return res.status(400).send("No Subcategory found.");

    res.json({ subcategory });
  } catch (error) {
    console.log("Error occured here \n", error);
    res.status(400).send("Something went wrong.");
  }
});

// * Create a new subcategory
// * Done
router.post("/new", async (req, res) => {
  try {
    const { err } = validateSubcategory(req.body);
    if (err) return res.status(400).send(err.details[0].message);

    let subcategory = await Subcategory.find({
      name: req.body.name.trim(),
      parentCategory: req.body.parentId,
    }).exec();
    console.log(subcategory);
    if (subcategory.length)
      return res.status(400).send("subcategory already exists.");

    subcategory = await Subcategory.create({
      name: req.body.name.trim(),
      parentCategory: req.body.parentId,
    });

    res.json({ subcategory });
  } catch (error) {
    console.log("Error occured here \n", error);
    res.status(400).send("Something went wrong.");
  }
});

// * Edit subcategory Name
// * Done
router.put("/name/:id", async (req, res) => {
  try {
    const { err } = validateSubcategory(req.body);
    if (err) return res.status(400).send(err.details[0].message);

    let subcategory = await Subcategory.findById(req.params.id).exec();
    if (!subcategory) return res.status(400).send("No subcategory found.");

    subcategory.name = req.body.name.trim();
    subcategory = await subcategory.save();

    res.json({ subcategory });
  } catch (error) {
    console.log("Error occured here \n", error);
    res.status(400).send("Something went wrong.");
  }
});

// * Edit Parent Category
// * Done
router.put("/parent/:id", async (req, res) => {
  try {
    let subcategory = await Subcategory.findById(req.params.id).exec();
    if (!subcategory) return res.status(400).send("No subcategory found.");

    subcategory.parentCategory = req.body.parentId;
    subcategory = await subcategory.save();

    res.json({ subcategory });
  } catch (error) {
    console.log("Error occured here \n", error);
    res.status(400).send("Something went wrong.");
  }
});

// * Add Deals

// * Remove Deals

// * Delete a subcategory
// TODO -> Should deals also be deleted

// * Requests End -->

module.exports = router;
