import express from "express";
import createHttpError from "http-errors";
import ProductsModel from "./model.js";

const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductsModel.find();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = new ProductsModel(req.body);
    const { _id } = await newProduct.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  console.log("----------------test");
  try {
    const product = await ProductsModel.findById(req.params.productId);
    if (product) {
      console.log("1");
      console.log(product);
      res.send(product);
    } else {
      console.log("2");

      next(createHttpError(404, "Product with the given id not found"));
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.put("/:productId", async (req, res, next) => {
  try {
    const searchedProduct = await ProductsModel.findById(req.params.productId);

    if (searchedProduct) {
      const updatedProducts = await ProductsModel.findByIdAndUpdate(
        req.params.productId, // WHO you want to modify
        req.body, // HOW you want to modify
        { new: true, runValidators: true }
      );

      res.send(updatedProducts);
    } else {
      next(createHttpError(404, `the searched products, doesn't exist`));
    }
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
