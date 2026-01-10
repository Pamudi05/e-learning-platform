import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import AdminPage from './pages/Dashboards/AdminPage';
import StudentPage from './pages/Dashboards/StudentPage';
import CourseDetails from './pages/Course/CourseDetails';
import EntrolledCourses from './pages/Course/EntrolledCourses';
import Course from './pages/Admin/Course';
import Students from './pages/Admin/Students';
import AddCourse from './pages/Admin/AddCourse';
import UpdateCourse from './pages/Admin/UpdateCourse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admin" element={<AdminPage />}>
          <Route path="courses" element={<Course />} />
          <Route path="addCourse" element={<AddCourse />} />
          <Route path="updateCourse" element={<UpdateCourse />} />
          <Route path="students" element={<Students />} />
        </Route>

        <Route path="/user" element={<StudentPage />} />
        <Route path="/coursedetails" element={<CourseDetails />} />
        <Route path="/entrolledcourses" element={<EntrolledCourses />} />
      </Routes>
    </Router>
  );
}

export default App;
