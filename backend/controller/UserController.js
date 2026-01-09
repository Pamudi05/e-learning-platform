import User from "../model/UserModel.js";
import bcrypt from "bcrypt"
import transporter from "../util/nodemailer.js"

const createUser = async (req, res) => {
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
      role:req.body.role      
    });

    const result = await user.save();
    res.status(201).json({
      message: "User Created Successfully",
      data: result,
    });

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: "Account Created",
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

export default { createUser };
