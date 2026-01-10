import NavBar from "../../components/navBar/NavBar";
import TopBar from "../../components/topbar/TopBar";
import "./CourseDetails.css";
import login from "../../assets/login.jpeg";
import Button from "../../components/Button/Button";
import RecommendCourses from "../../components/recommended/RecommendCourses";

const CourseDetails = () => {
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
            <img src={login} alt="couse-image" />
          </div>
          <div className="right">
            <h2>Java Part I</h2>
            <p>
              To make the image fit nicely inside cardInnerTop using only CSS,
              you have a few common options. The best one depends on whether you
              want the image to fill the container or fit without cropping.
            </p>
            <span>Rs.1500.00</span>
            <Button className="btn" type="submit" name="ENROLL COURSE"/>
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
        <RecommendCourses/>
      </div>
    </div>
  );
};

export default CourseDetails;
