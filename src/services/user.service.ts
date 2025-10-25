import { Request, Response, NextFunction } from "express";
import { getUserDetailsById } from "../repository/user.repository";
import User from "../schemas/User";
import generateToken from "../config/helper/generateToken";
import { generateError } from "../config/Error/functions";
import Company from "../schemas/Company";
import bcrypt from "bcrypt"; // Make sure to install: npm install bcrypt @types/bcrypt

const createAdminUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError("Please provide email and password", 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw generateError("Please provide a valid email address", 400);
    }

    const existUser = await User.findOne({ email: email });

    if (existUser) {
      throw generateError("User with this email already exists", 400);
    }

    // Determine role: if no superAdmin exists, make this user the superAdmin
    const existingSuperAdmin = await User.findOne({ type: "superAdmin" });
    const newUserType = existingSuperAdmin ? (req.body.type || "admin") : "superAdmin";

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
      type: newUserType,
      isActive: true // Auto-activate since no OTP verification needed
    });

    const savedUser: any = await user.save();

    if (!savedUser) {
      throw generateError("Failed to create user", 500);
    }

    // Create company with user's name
    const savedCompany: any = await new Company({ 
      type: "vendor",
      name: savedUser.name || `${savedUser.email}'s Company`
    }).save();

    savedUser.company = savedCompany._id;
    await savedUser.save();

    let generatedToken = generateToken({ userId: savedUser._id.toString() });

    return res.status(201).send({
      message: "Account created successfully.",
      data: {
        email: savedUser.email,
        token: generatedToken
      },
      statusCode: 201,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError("Please provide email and password", 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw generateError("Please provide a valid email address", 400);
    }

    const user: any = await User.findOne({ email });

    if (!user) {
      throw generateError("This email is not registered. Please sign up first.", 404);
    }

    // Check if user is active
    if (!user.isActive) {
      throw generateError("Your account is not active. Please contact support.", 403);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw generateError("Invalid email or password", 401);
    }

    let generatedToken = generateToken({ userId: user._id.toString() });

    return res.status(200).send({
      message: "Login successful",
      data: {
        token: generatedToken
      },
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getUserDetailsByIdService = async (req: any, res: Response, next: any) => {
  try {
    const { status, data, message, statusCode } = await getUserDetailsById(req.userId)
    res.status(statusCode).send({
      status,
      data, message
    })
  }
  catch (err: any) {
    next(err)
  }
}

export { createAdminUser, loginUser, getUserDetailsByIdService };