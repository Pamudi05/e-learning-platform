import User from '../model/userModel.js';

const getUsersByRole = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export default { getUsersByRole };