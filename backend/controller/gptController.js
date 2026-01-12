import openai from "../config/openAI.js";
import Enroll from "../model/entrollementModel.js";

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

                  The student is already enrolled in these courses:
                  ${courseTitles.length > 0 ? courseTitles.join(", ") : "No courses yet"}

                  Based on the student's goal, recommend 4 suitable online courses.
                  Respond as a list.
                  `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.status(200).json({
      recommendations: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { recommendCourses };
