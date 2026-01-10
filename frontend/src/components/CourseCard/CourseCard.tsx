import "./CorseCard.css";
import img from "../../assets/login.jpeg";

interface CourseCardProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ onClick }) => {
  return (
    <div className="cardOuter" onClick={onClick}>
      <div className="cardInner">
        <div className="cardInnerTop">
          <img src={img} alt="course-image" />
        </div>
        <div className="cardInnerBottom">
          <div className="cardInnerBottom-top">
            <p>Category</p>
            <p>Duration</p>
          </div>
          <div className="cardInnerBottom-top">
            <h4>Java Part I</h4>
          </div>
          <div className="cardInnerBottom-middle">
            <p>
              To make the image fit nicely inside cardInnerTop using only CSS,
              you have a few common options. The best one depends on whether you
              want the image to fill the container or fit without cropping.
            </p>
            {/* <p>
              {description.length > 20
                ? description.slice(0, 20) + "...see more"
                : description}
            </p> */}
          </div>
          <div className="cardInnerBottom-bottom">
            <span>Rs.1500.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
