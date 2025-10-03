import { User } from "../models/user.model.js";
import { deleteFile, uploadFile } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      next(new ErrorHandler("Missing Inputs", 400));
    const user = await User.create({ name, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) next(new ErrorHandler("Missing Input", 400));
    const user = await User.findOne({ email }).select("+password");
    if (!user) next(new ErrorHandler("User Not Found", 404));
    const isMatchedPassword = await user.comparePassword(password);
    if (isMatchedPassword) {
      sendToken(user, 200, res);
    } else next(new ErrorHandler("Password does not match", 401));
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    const avatarResponse = await uploadFile(
      req.body.avatar,
      "shop-practice/avatar"
    );
    if (req?.user?.avatar?.url) await deleteFile(req?.user?.avatar?.public_id);
    const user = await User.findByIdAndUpdate(req?.user?._id, {
      avatar: avatarResponse,
    });
    return res.status(200).json({
      success: true,
      message: "Updated User's Avatar Successfully",
      data: user,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req?.user?._id;
    const user = await User.findById(userId);
    return res.status(200).json({
      success: true,
      message: "Get User Profile Successfully",
      data: user,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateUserPassword = async (req, res, next) => {
  try {
    const userId = req?.user?._id;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(userId).select("+password");
    const isPasswordMatched = await user.comparePassword(oldPassword);
    if (!isPasswordMatched)
      return next(new ErrorHandler("Old Password Is Not Correct", 400));
    user.password = newPassword;
    user.save();
    return res
      .status(200)
      .json({ success: true, message: "Updated User's Password Successfully" });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req?.user?._id;
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Updated User's Profile Successfully",
      data: user,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
//  Get All User -Admin
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      message: "Get User List Successfully",
      data: users,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const getUserDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("User Not Found", 404));
    return res.status(200).json({
      success: true,
      message: "Get User Details Successfully",
      data: user,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({
      success: true,
      message: "Update User Successfully",
      data: user,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("User Not Found", 404));
    if (user.avatar.public_id) {
      await deleteFile(user.avatar.public_id);
    }
    await user.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Deleted User Successfully",
      data: user,
    });
  } catch (error) {
    console.log("Error ", error);
    return res
      .status(503)
      .json({ success: false, message: "Internal Server Error" });
  }
};
