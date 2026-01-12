import "./RecommendCourses.css";
import AxiosInstance from "../../config/axiosInstance";
import { useState } from "react";

const RecommendCourses = () => {
  const [question, setQuestion] = useState("");
  const [recommendCourses, setRecommendCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      setLoading(true);

      const response = await AxiosInstance.post("/openai/recommend", {
        userId,
        question,
      });

      const recommendationsText = response.data.recommendations;
      console.log(recommendationsText);

      const coursesArray = recommendationsText
        .split("\n")
        .filter((line: string) => line.trim() !== "");

      setRecommendCourses(coursesArray);

      console.log(response.data.recommendations);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="recommendOuter">
      <h2>Recommended for you</h2>
      <div className="recommendInner">
        <input
          type="text"
          placeholder="Ask something like: I want to be a software engineer, what courses should I follow?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button onClick={getRecommendations} disabled={loading}>
          {loading ? "Getting recommendations..." : "Ask"}
        </button>

        <ul>
          {recommendCourses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecommendCourses;
