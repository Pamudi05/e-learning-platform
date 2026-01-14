import Content from "../model/contentModel.js";
import Course from "../model/courseModel.js";

const createContent = async (req, res) => {
  try {
    const { courseId, title, order } = req.body;

    console.log(courseId, title, order)

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const content = await Content.create({
      courseId,
      title,
      order,
    });

    console.log(content)

    res.status(201).json({
      message: "Chapters added successfully",
      content,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContentByCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const contents = await Content.find({ courseId }).sort({ order: 1 });

    res.status(200).json({ data: contents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { createContent , getContentByCourse }
