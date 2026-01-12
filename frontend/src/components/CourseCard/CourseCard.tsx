import "./CorseCard.css";
import img from "../../assets/login.jpeg";

interface CourseCardProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  title: string;
  description: string;
  category: string;
  duration?: string;
  price: number;
  image?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  onClick,
  title,
  description,
  category,
  duration,
  price,
  image,
}) => {
  return (
    <div className="cardOuter" onClick={onClick}>
      <div className="cardInner">
        <div className="cardInnerTop">
          <img src={image || img} alt="course-image" />
        </div>
        <div className="cardInnerBottom">
          <div className="cardInnerBottom-top">
            <p>{category}</p>
            <p>{duration}</p>
          </div>
          <div className="cardInnerBottom-top">
            <h4>{title}</h4>
          </div>
          <div className="cardInnerBottom-middle">
            <p>
              {description}
            </p>
          </div>
          <div className="cardInnerBottom-bottom">
            <span>Rs.{price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
