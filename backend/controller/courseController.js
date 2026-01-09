import Course from "../model/courseModel.js";

const createCourse = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const image = req.files.map((file) => file.path);

    const course = new Course({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      image: image,
      instructorId: req.user.userId,
    });

    const result = await course.save();
    res.status(201).json({
      message: "Course Created Successfully",
      data: result,
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

export default { createCourse };