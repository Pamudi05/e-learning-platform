import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/CourseCard/CourseCard";
import NavBar from "../../components/navBar/NavBar";
import TopBar from "../../components/topbar/TopBar";
import { useEffect, useState } from "react";
import AxiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

const EntrolledCourses = () => {
  const navigate = useNavigate();
  const [enrollCourses, setEnrollCourses] = useState<any[]>([]);

  const getAllEnrollCourses = async () => {
    try {
      const userId = localStorage.getItem("userId");
      console.log("userId", userId);

      if (!userId) {
        toast.error("You must be logged in");
        return;
      }

      const response = await AxiosInstance.get(
        "/enroll/getAllEntrollCourses?userId=${userId}"
      );
      setEnrollCourses(response.data.courses);
    } catch (error) {
      toast.error("Can not load. Please try again");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEnrollCourses();
  }, []);

  return (
    <div className="HomepageOuter">
      <div className="homepageTop">
        <NavBar />
      </div>
      <div className="homepageMiddle">
        <TopBar title="ENTROLLED COURSES" />
      </div>
      <div className="homepageInner">
        {enrollCourses.length > 0 ? (
          enrollCourses.map((enrollcourse) => (
            <CourseCard
              key={enrollcourse._id}
              title={enrollcourse.title}
              description={enrollcourse.description}
              category={enrollcourse.category}
              duration={enrollcourse.duration}
              price={enrollcourse.price}
              image={enrollcourse.image?.[0]}
              onClick={() => navigate(`/coursedetails/${enrollcourse._id}`)}
            />
          ))
        ) : (
          <p className="no">No enrolled courses found.</p>
        )}
      </div>
    </div>
  );
};

export default EntrolledCourses;
