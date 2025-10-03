import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import APIFilter from "../utils/apiFilters.js";
import { deleteFile, uploadFile } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getAllProducts = async (req, res) => {
  try {
    const resPerPage = 4;
    const apiFilter = new APIFilter(Product, req.query).search().filters(req);
    let products = await apiFilter.query;
    apiFilter.pagination(resPerPage);
    products = await apiFilter.query.clone();
    return res.status(200).json({
      success: true,
      message: "Get Products Successfully !",
      data: products,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const pid = req.params.id;
    const product = await Product.findById(pid).populate("reviews.user");
    if (!product) return next(new ErrorHandler("Product Not Found", 404));
    return res.status(200).json({
      success: true,
      message: "Get Product Successfully !",
      data: product,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    req.body.user = req.user._id;

    const product = await Product.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Created Product Successfully !",
      data: product,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const pid = req.params.id;
    const product = await Product.findById(pid);
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "Product Not Found" });
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
      new: true,
    });
    return res.status(201).json({
      success: true,
      message: "Updated Product Successfully !",
      data: updatedProduct,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const pid = req.params.id;
    const product = await Product.findById(pid);
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "Product Not Found" });
    // Delete Images File From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      const element = product.images[i].public_id;
      await deleteFile(element);
    }
    await product.deleteOne();
    return res.status(201).json({
      success: true,
      message: "Deleted Product Successfully !",
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
// Create/Update Product Review
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req?.user?._id,
      rating: Number(rating),
      comment,
    };
    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "Product Not Found" });

    const isReviewed = product?.reviews?.find(
      (r) => r.user.toString() === review.user
    );
    if (isReviewed) {
      product.reviews.forEach((r) => {
        if (r.user.toString() === review.user.toString()) {
          r.comment = review.comment;
          r.rating = review.rating;
        }
      });
    } else {
      product?.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save({ validateBeforeSave: false });
    return res.status(201).json({
      success: true,
      message: "Review Product Successfully",
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
// Delete Product Review
export const deleteProductReview = async (req, res) => {
  try {
    const product = await Product.findById(req.query.productId);
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "Product Not Found" });

    const reviews = product?.reviews?.filter(
      (review) => review.id.toString() !== req?.query?.id.toString()
    );
    const numOfReviews = reviews.length;

    const ratings =
      numOfReviews === 0
        ? 0
        : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          numOfReviews;
    const data = await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      { new: true }
    );
    await product.save({ validateBeforeSave: false });
    return res.status(201).json({
      success: true,
      message: "Delete Review Product Successfully",
      data,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.query.id).populate(
      "reviews.user"
    );
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "Product Not Found" });

    return res.status(201).json({
      success: true,
      message: "Get Reviews Product Successfully",
      data: product.reviews,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      message: "Get Products Successfully !",
      data: products,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const uploadProductImages = async (req, res) => {
  try {
    const pid = req.params.id;
    const product = await Product.findById(pid);
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "Product Not Found" });
    const uploader = async (image) =>
      uploadFile(image, "shop-practice/products");
    const urls = await Promise.all(req.body.images.map(uploader));
    product?.images?.push(...urls);
    await product.save();
    return res.status(201).json({
      success: true,
      message: "Upload Product Images Successfully !",
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteProductImage = async (req, res) => {
  try {
    const pid = req.params.id;
    const product = await Product.findById(pid);
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "Product Not Found" });
    const isDeleted = await deleteFile(req.body.imgId);
    if (isDeleted) {
      product.images = product.images.filter(
        (image) => image.public_id !== req.body.imgId
      );
    }
    await product.save();
    return res.status(201).json({
      success: true,
      message: "Deleted Product Image Successfully !",
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const canReview = async (req, res) => {
  try {
    const pid = req.query.productId;
    const orders = await Order.find({
      user: req?.user?._id,
      "orderItems.product": pid,
    });
    if (orders.length === 0) return res.status(400).json({ canReview: false });

    return res.status(200).json({
      canReview: true,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
