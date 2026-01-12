import NavBar from "../../components/navBar/NavBar";
import TopBar from "../../components/topbar/TopBar";
import "./CourseDetails.css";
import Button from "../../components/Button/Button";
import RecommendCourses from "../../components/recommended/RecommendCourses";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

interface CourseDetailsProps {
  _id?: number;
  title?: string;
  description?: string;
  category?: string;
  duration?: string;
  price?: number;
  image?: string;
}

const CourseDetails: React.FC<CourseDetailsProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseDetailsProps>({});
  const [isEnrolled, setIsEnrolled] = useState(false);

  const getCourse = async () => {
    try {
      const response = await AxiosInstance.get(`/course/findById/${id}`);
      setCourse(response.data.data);
    } catch (error) {
      toast.error("Failed to load course");
      console.log(error);
    }
  };

  const userId = localStorage.getItem("userId");
  console.log("userId", userId);

  const handleEntrollClick = async () => {
    if (!userId) {
      toast.error("You must be logged in to enroll");
      return;
    }

    try {
      const response = await AxiosInstance.post("/enroll/addToenroll", {
        userId,
        courseId: course._id,
      });
      toast.success(response.data.message);
      navigate("/entrolledcourses");
    } catch (error:any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Enrollment failed. Try again");
      }
    }
  };

  const checkEnrollment = async () => {
  if (!userId) return;

  try {
    const response = await AxiosInstance.get(`/enroll/getEnrollById/${userId}/${id}`);
    setIsEnrolled(response.data.isEnrolled);
  } catch (error) {
    console.log("Failed to check enrollment", error);
  }
};


useEffect(() => {
    getCourse();
    checkEnrollment();
  }, [id, userId]);


  return (
    <div className="coursedetailsOuter">
      <div className="homepageTop">
        <NavBar />
      </div>
      <div className="homepageMiddle">
        <TopBar title="COURSE DETAILS" />
      </div>
      <div className="coursedetailsInner">
        <div className="coursedetailsInner-top">
          <div className="left">
            <img src={course.image} alt="couse-image" />
          </div>
          <div className="right">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>{course.category}</p>
            <p>{course.duration}</p>
            <span>Rs.{course.price?.toFixed(2)}</span>
            <Button
              className="btn"
              type="submit"
              name={isEnrolled ? "ENROLLED" : "ENROLL COURSE"}
              onButtonClick={handleEntrollClick}
              disabled={isEnrolled}
            />
          </div>
        </div>
        <div className="coursedetailsInner-bottom">
          <h3>Course Content</h3>
          <div className="line"></div>
          <ul>
            <li>Java Basics</li>
            <li>Java Basics</li>
            <li>Java Basics</li>
            <li>Java Basics</li>
            <li>Java Basics</li>
            <li>Java Basics</li>
          </ul>
        </div>
      </div>
      <div className="couserdetailsBottom">
        <RecommendCourses />
      </div>
    </div>
  );
};

export default CourseDetails;
