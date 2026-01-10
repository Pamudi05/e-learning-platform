import "./Sidebar.css";
import student from "../../assets/student.png";
import course from "../../assets/course.png";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  
  const navItems = [
    {
      name: "courses",
      label: "ALL COURSES",
      icon: course,
      path: "/admin/courses",
    },
    {
      name: "student",
      label: "ALL STUDENTS",
      icon: student,
      path: "/admin/students",
    },
  ];

  return (
    <div className="sidebar-outer">
      <ul className="sidebar-list">
        {navItems.map((menu) => (
          <li key={menu.name}>
            <div className="sidebar-button" onClick={() => navigate(menu.path)}>
              <img src={menu.icon} alt="sidebar-icons" />
              <p>{menu.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
