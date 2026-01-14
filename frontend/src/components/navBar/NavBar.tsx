import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useState } from "react";
import person from "../../assets/person.png";
import logout from "../../assets/logout.png";
import arrowDown from "../../assets/arrow-down.png";
import close from "../../assets/close.png";
import menu from "../../assets/menu.png";
import AxiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

interface NavBarProps {
  role?: "user" | "admin";
}

const NavBar = ({ role = "user" }: NavBarProps) => {
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const logOut = async () => {
    try {
      const response = await AxiosInstance.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("user");
      localStorage.removeItem("userId");

      Navigate("/");

      toast.success("LogOut Succesfully");
      console.log("logout", response);
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="navBarOuter">
      <div className="navBarleft element">
        <p>E-LEARNING PLATFORM</p>
      </div>
      <div className="navBarright element">
        <img
          className="menuicon"
          src={open ? close : menu}
          alt="menu"
          onClick={() => setOpen(!open)}
        />
        <ul className={open ? "menu open" : "menu"}>
          {role === "user" && (
            <li>
              <Link to="/user">ALL COURSE</Link>
            </li>
          )}
          {role === "user" && (
            <li>
              <Link to="/entrolledcourses">MY COURSE</Link>
            </li>
          )}
          <li>
            {!open ? (
              <div
                className="personBox"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="personCircle">
                  <img src={person} alt="person" />
                  {profileOpen && (
                    <div className="profile-menu">
                      <ul>
                        <li>
                          <div onClick={logOut}>
                            <span>LOGOUT</span>
                            <img src={logout} alt="" />
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <img src={arrowDown} alt="arrow down" />
              </div>
            ) : (
              <li>
                <div className="logout" onClick={logOut}>
                  <span>LOGOUT</span>
                  <img src={logout} alt="" />
                </div>
              </li>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
