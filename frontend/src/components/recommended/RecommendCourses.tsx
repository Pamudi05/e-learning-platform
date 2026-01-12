import CourseCard from '../CourseCard/CourseCard';
import './RecommendCourses.css'
const RecommendCourses = () => {
    return (
        <div className="recommendOuter">
            <h2>Recommended for you</h2>
            <div className='recommendInner'>
                {/* <CourseCard/>
                <CourseCard/>
                <CourseCard/>
                <CourseCard/> */}
            </div>
        </div>
    );
}

export default RecommendCourses;