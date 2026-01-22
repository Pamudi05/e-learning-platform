import Enroll from "../model/entrollementModel.js";
import User from "../model/userModel.js";
import Course from "../model/courseModel.js";

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

    res
      .status(201)
      .json({ message: "Enrollment successful", enrollment: newEnroll });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const getUserEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.userId;

    const enrollments = await Enroll.find({ userId })
      .populate("courseId", "title description category price duration image")
      .exec();

    const courses = enrollments.map((enroll) => {
      const enrollcorses = enroll.courseId._doc || enroll.courseId;
      return {
        ...enrollcorses,
        image:enrollcorses.image,
      };
    });

    res.status(200).json({ courses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getEnrollById = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    const enrollment = await Enroll.findOne({ userId, courseId });

    if (enrollment) {
      return res.status(200).json({ isEnrolled: true });
    } else {
      return res.status(200).json({ isEnrolled: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllEnrolledStudents = async (req, res) => {
  try {
    const searchText = req.query.searchText || "";
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.size) || 5;

    const skip = (pageNumber - 1) * pageSize;

    const users = await User.find({
      $or: [
        { name: new RegExp(searchText, "i") },
        { email: new RegExp(searchText, "i") },
      ],
    }).select("_id");

    const courses = await Course.find({
      title: new RegExp(searchText, "i"),
    }).select("_id");

    const userIds = users.map((u) => u._id);
    const courseIds = courses.map((c) => c._id);

    const enrollQuery =
      searchText.trim() === ""
        ? {}
        : {
            $or: [
              { userId: { $in: userIds } },
              { courseId: { $in: courseIds } },
            ],
          };

    const total = await Enroll.countDocuments(enrollQuery);

    const enrollments = await Enroll.find(enrollQuery)
      .populate("userId", "name email")
      .populate("courseId", "title price duration")
      .select("userId courseId enrolledAt")
      .skip(skip)
      .limit(pageSize)
      .sort({ enrolledAt: -1 });

    const students = enrollments.map((enroll) => ({
      studentName: enroll.userId?.name,
      email: enroll.userId?.email,
      courseName: enroll.courseId?.title,
      coursePrice: enroll.courseId?.price,
      courseDuration: enroll.courseId?.duration,
      enrolledAt: enroll.enrolledAt,
    }));

    console.log(students)

    res.status(200).json({
      total,
      students,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


export default {
  addToEntroll,
  getUserEnrolledCourses,
  getEnrollById,
  getAllEnrolledStudents,
};
