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

    const courses = enrollments.map(enroll => {
      const enrollcorses = enroll.courseId._doc || enroll.courseId;
      return {
        ...enrollcorses,
        image:
          enrollcorses.image?.map(
            (img) => `${req.protocol}://${req.get("host")}/${img}`
          ) || [],
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

export default { addToEntroll, getUserEnrolledCourses, getEnrollById };
