import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import AdminPage from "./pages/Dashboards/AdminPage";
import StudentPage from "./pages/Dashboards/StudentPage";
import CourseDetails from "./pages/Course/CourseDetails";
import EntrolledCourses from "./pages/Course/EntrolledCourses";
import Course from "./pages/Admin/Course";
import Students from "./pages/Admin/Students";
import AddCourse from "./pages/Admin/AddCourse";
import UpdateCourse from "./pages/Admin/UpdateCourse";
import ProtectedRoute from "./protectedRoute/protectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        >
          <Route path="courses" element={<Course />} />
          <Route path="addCourse" element={<AddCourse />} />
          <Route path="updateCourse/:id" element={<UpdateCourse />} />
          <Route path="students" element={<Students />} />
        </Route>

        <Route path="/user" element={<StudentPage />} />
        <Route path="/coursedetails/:id" element={<CourseDetails />} />
        <Route
          path="/entrolledcourses"
          element={
            <ProtectedRoute>
              <EntrolledCourses />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
