import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import transporter from "../util/nodemailer.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const secret = process.env.SECRET_KEY;

const registerUser = async (req, res) => {
  try {
    const existingEmail = await User.findOne({ email: req.body.email });

    if (existingEmail) {
      return res.status(400).json({ message: "Email Already Exists" });
    }

    const hash = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });

    const result = await user.save();
    res.status(201).json({
      message: "User Created Successfully",
      data: result,
    });

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: "Account Created Successfully",
      text: "You have successfully created an account",
    };

    transporter.sendMail(mailOption, function (error, info) {
      if (error) {
        return res.status(500).json({ error: error });
      } else {
        //console.log("email sent");
        return res.status(200).json({ message: "Email Sent", info });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const isConfirmed = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    if (!isConfirmed) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      secret,
      {
        expiresIn: "5h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 5 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      message: "User Successfully Login",
      user: {
        userId: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
    });

    console.log("token", token);
  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    res.status(500).json({ message: "something went wrong", error: error });
  }
};

const logOut = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logout successful!" });
    res.end();
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error: error });
  }
};

export default { registerUser, loginUser, logOut };
