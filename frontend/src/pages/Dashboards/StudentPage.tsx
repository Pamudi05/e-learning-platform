import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/CourseCard/CourseCard";
import NavBar from "../../components/navBar/NavBar";
import TopBar from "../../components/topbar/TopBar";
import AxiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

const StudentPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);

  const getAllCourses = async () => {
    try {
      const response = await AxiosInstance.get("/course/findAll?size=100");
      setCourses(response.data.courses);
    } catch (error) {
      toast.error("Can not load. Please try again");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div className="HomepageOuter">
      <div className="homepageTop">
        <NavBar role="user" />
      </div>
      <div className="homepageMiddle">
        <TopBar title="ALL COURSES" />
      </div>
      <div className="homepageInner">
        {courses.map((course) => (
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

export default StudentPage;
