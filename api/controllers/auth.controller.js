import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import process from "node:process";

const age = 1000 * 60 * 60 * 24 * 7;

export const register = async (req, res) => {
  const { username, email, password, isAdmin = false } = req.body;

  try {
    /// Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }
    // Firebase google auth password is null
    let hashedPassword = null;
    // HASH THE PASSWORD
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    console.log(hashedPassword);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        isAdmin,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User created successfully", ...newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // CHECK IF THE USER EXISTS

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    // CHECK IF THE PASSWORD IS CORRECT

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // GENERATE COOKIE TOKEN AND SEND TO THE USER

    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;
    console.log(userInfo);
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

// Login with Firebase google
export const googleLogin = async (req, res) => {
  const { username, email, googleId, avatar } = req.body;

  try {
    // First check if user already exists with googleId
    let user = await prisma.user.findFirst({ where: { googleId } });

    if (!user) {
      // If user is not found, check by email (to avoid duplicate users)
      user = await prisma.user.findUnique({ where: { email } });

      // If user exists but no googleId is set, update user profile
      if (user && !user.googleId) {
        user = await prisma.user.update({
          where: { email },
          data: { googleId },
        });
      }
    }

    // If user still doesn't exist, create a new one
    if (!user) {
      user = await prisma.user.create({
        data: {
          username,
          email,
          googleId,
          avatar,
          password: null,
        },
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, googleId: user.googleId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    // Send JWT token in cookies or response
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: age,
    });
    res.status(200).json({ message: "Login successful", ...user });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
