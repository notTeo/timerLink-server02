import { User } from "../../models/userSchema";
import { Response } from "express";
import { sendErrorResponse } from "../../utils/responses";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getAllUsers(res: Response) {
  try {
    return await User.find();
  } catch (e) {
    console.log("Error getting users", e);
    sendErrorResponse(res, "Error getting users", 500);
  }
}

export async function createNewUser(username: string, password: string,confirmPassword:string, email: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username: username, password: hashedPassword, email: email });
  await newUser.save();
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

  return { user: newUser, token: token };
}

export async function getUserById(userId: string, res: Response) {
  try {
    const user = await User.findById(userId).populate({
      path: "links",
      populate: {
        path: "targets",
      },
    });
    if (!user) {
      return sendErrorResponse(res, "User not found", 404);
    }
    return user;
  } catch (e) {
    console.log("Error getting user", e);
  }
}

export async function updateUserById(
  userId: string,
  username: string,
  password: string,
) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found")
    }
    if (!username) {
      username = user.username;
    }
    if (!password) {
      password = user.password;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.findByIdAndUpdate(
      userId,
      {
        username: username,
        password: hashedPassword,
      },
      { new: true },
    );
}

export async function deleteUserById(userId: string, res: Response) {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return sendErrorResponse(res, "Error user not found", 404);
    }
    return deletedUser;
  } catch (e) {
    console.log("Error deleting user", e);
  }
}
