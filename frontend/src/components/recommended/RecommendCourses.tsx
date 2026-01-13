import "./RecommendCourses.css";
import AxiosInstance from "../../config/axiosInstance";
import { useState } from "react";
import InputField from "../InputFiled/InputField";
import Button from "../Button/Button";
import CourseCard from "../CourseCard/CourseCard";
import { useNavigate } from "react-router-dom";

const RecommendCourses = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [recommendCourses, setRecommendCourses] = useState<any[]>([]);
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

      setRecommendCourses(response.data.recommendations);

      console.log(response.data.recommendations);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="recommendOuter">
      <h2>Recommended for you</h2>
      <div className="recommendInner">
        <InputField
          type="text"
          placeholder="Ask something like: I want to be a software engineer, what courses should I follow?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <Button
          onButtonClick={getRecommendations}
          disabled={loading}
          name={loading ? "Getting recommendations..." : "Ask"}
        />
      </div>
      <div className="recommendBottom">
        {recommendCourses.map((course) => (
          <CourseCard
            key={course._id}
            title={course.title}
            description={course.description}
            category={course.category}
            duration={course.duration}
            price={course.price}
            image={course.image?.[0]}
            onClick={() => navigate(`/coursedetails/${course._id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendCourses;
