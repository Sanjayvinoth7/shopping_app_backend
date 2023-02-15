const express = require("express");
const  { Product } = require("../models/product");
const cloudinary = require("../utils/cloudinary");
const {isAdmin} = require("../middleware/auth")

const router = express.Router();

//Create product

router.post("/", isAdmin, async (req, res) => {
  const { name, desc, price, image } = req.body;

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "ecommerce",
      });

      if (uploadRes) {
        const product = new Product({
          name,
          desc,
          price,
          image: uploadRes,
        });

        const savedProduct = await product.save();

        res.status(200).send(savedProduct);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//Delete

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted...");
  } catch (error) {
    res.status(500).send(error);
  }
});


//Get All Products

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//Get Products

router.get("/find/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    res.status(200).send(products);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


//Update

router.put("/:id", isAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

