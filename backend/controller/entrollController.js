import Enroll from "../model/entrollementModel.js";

const addToEntroll = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res
        .status(400)
        .json({ message: "userId and courseId are required" });
    }
    const existingEnroll = await Enroll.findOne({ userId, courseId });
    if (existingEnroll) {
      return res
        .status(400)
        .json({ message: "User is already enrolled in this course" });
    }

    const newEnroll = new Enroll({ userId, courseId });
    await newEnroll.save();

    res.status(201).json({ message: "Enrollment successful", enrollment: newEnroll });

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const getUserEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user._id;

    const enrollments = await Enroll.find({ userId })
      .populate("courseId", "title description category price duration") // select only needed fields
      .exec();

    const courses = enrollments.map(enroll => enroll.courseId);

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default {addToEntroll, getUserEnrolledCourses};