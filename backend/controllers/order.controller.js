import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemsPrice,
      taxAmount,
      shippingAmount,
      totalAmount,
    } = req.body;
    console.log(orderItems);
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemsPrice,
      taxAmount,
      shippingAmount,
      totalAmount,
      user: req.user._id,
    });
    return res.status(201).json({
      success: true,
      message: "Created Order Successfully",
      data: order,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    if (!orders) return next(new ErrorHandler("No Orders Found", 404));
    return res.status(201).json({
      success: true,
      message: "Get Orders Successfully",
      data: orders,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getOrderDetails = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) return next(new ErrorHandler("No Order Found", 404));
    return res.status(200).json({
      success: true,
      message: "Get Order Detail Successfully",
      data: order,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
//  get all order - ADMIN
export const allOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    if (!orders) return next(new ErrorHandler("No Orders Found", 404));
    return res.status(201).json({
      success: true,
      message: "Get Orders List Successfully",
      data: orders,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
// update order - ADMIN
export const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new ErrorHandler("No Orders Found", 404));
    if (order?.orderStatus === "Delivered")
      return next(
        new ErrorHandler("You have already delivered this order", 400)
      );

    order?.orderItems.forEach(async (item) => {
      const product = await Product.findById(item.product.toString());
      if (!product) return next(new ErrorHandler("Product Not Found", 404));
      product.stock = product.stock - item.quantity;
      await product.save();
    });

    order.orderStatus = req.body.status;
    if (order.orderStatus === "Processing" || order.orderStatus === "Shipped") {
      order.paymentInfo.status = "Not Paid";
    } else if (order.orderStatus === "Delivered") {
      order.paymentInfo.status = "Paid";
      order.deliveredAt = Date.now();
    }
    order.save();
    return res.status(201).json({
      success: true,
      message: "Updated Order Successfully",
      data: order,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
// delete order - ADMIN
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new ErrorHandler("No Order Found", 404));
    await order.deleteOne();
    return res.status(201).json({
      success: true,
      message: "Delete Order Successfully",
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const generatesDateBetween = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    const formattedDate = currentDate.toISOString().split("T")[0];
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};
const getSalesData = async (startDate, endDate) => {
  const salesData = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },

    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
        totalSales: { $sum: "$totalAmount" },
        totalOrders: { $sum: 1 },
      },
    },
  ]);
  const saleMap = new Map();
  let totalSales = 0;
  let totalOrders = 0;
  salesData.forEach((entry) => {
    const date = entry?._id?.date;
    const sales = entry?.totalSales;
    const noOrders = entry?.totalOrders;
    saleMap.set(date, { sales, noOrders });
    totalSales += sales;
    totalOrders += noOrders;
  });
  const datesBetween = generatesDateBetween(startDate, endDate);
  const finalSalesData = datesBetween.map((date) => {
    return {
      date,
      sales: (saleMap.get(date) || { sales: 0 }).sales,
      noOrders: (saleMap.get(date) || { noOrders: 0 }).noOrders,
    };
  });
  return {
    salesData: finalSalesData,
    totalSales,
    totalOrders,
  };
};
// get sales - ADMIN
export const getSales = async (req, res, next) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);
    const { salesData, totalSales, totalOrders } = await getSalesData(
      startDate,
      endDate
    );
    return res.status(201).json({
      success: true,
      salesData,
      totalSales,
      totalOrders,
      message: "Get Sales Data Successfully",
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
