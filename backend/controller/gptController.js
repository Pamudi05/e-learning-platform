import openai from "../config/openAI.js";
import Enroll from "../model/entrollementModel.js";


// ✅ Simple GPT test
const testGPT = async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: "Say hello in one sentence" },
        { role: "user", content: "Ask how can I help" }
      ],
    });

    res.status(200).json({
      reply: response.choices[0].message.content,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GPT course recommendation (uses Enroll + populate)
const recommendCourses = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware

    // 🔑 THIS IS THE LINE YOU ASKED ABOUT
    const enrollments = await Enroll
      .find({ userId })
      .populate("courseId");

    const courseTitles = enrollments.map(
      (enroll) => enroll.courseId.title
    );

    const prompt = `
    A student is enrolled in these courses:
    ${courseTitles.join(", ")}.
    Recommend 3 additional online courses.
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

export default { testGPT , recommendCourses}
