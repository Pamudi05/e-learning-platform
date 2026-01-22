import openai from "../config/openAI.js";
import Enroll from "../model/entrollementModel.js";
import Course from "../model/courseModel.js";

const recommendCourses = async (req, res) => {
  try {
    const { userId, question } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const enrollments = await Enroll.find({ userId }).populate("courseId");

    const courseTitles = enrollments.map((enroll) => enroll.courseId.title);

    const prompt = `
A student asked:
"${question}"

The student is already enrolled in:
${courseTitles.length > 0 ? courseTitles.join(", ") : "No courses yet"}

From our available courses, suggest 4 relevant course titles.
Respond ONLY as a JSON array of strings.

Example:
["Full Stack Web Development", "Data Structures & Algorithms"]
`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const recommendCourseTitles = JSON.parse(
      response.choices[0].message.content
    );

    console.log("recommendCourseTitles", recommendCourseTitles);

    const keywordQueries = recommendCourseTitles.flatMap((title) =>
      title
        .split(" ")
        .filter((word) => word.length > 3)
        .map((word) => ({
          title: { $regex: word, $options: "i" },
        }))
    );

    console.log("keywordQueries", keywordQueries);

    const recommendedCourses = await Course.find({
      $or: keywordQueries,
    }).select("title description category price duration image").lean();

    const corsesRecommend = recommendedCourses.map(course => ({
      ...course,
      image:course.image
    }))

    console.log("recommendedCourses", corsesRecommend);

    res.status(200).json({ recommendations: corsesRecommend });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { recommendCourses };
