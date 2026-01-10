import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/CourseCard/CourseCard";
import NavBar from "../../components/navBar/NavBar";
import TopBar from "../../components/topbar/TopBar";

const EntrolledCourses = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/coursedetails');
  }

  return (
    <div className="HomepageOuter">
      <div className="homepageTop">
        <NavBar />
      </div>
      <div className="homepageMiddle">
        <TopBar title="ENTROLLED COURSES" />
      </div>
      <div className="homepageInner">
        <CourseCard onClick={handleNavigation}/>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
};

export default EntrolledCourses;
