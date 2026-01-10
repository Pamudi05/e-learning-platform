import { Link } from "react-router-dom";
import "./NavBar.css";
import { useState } from "react";
import person from "../../assets/person.png";
import light from "../../assets/light_mode.png";
import logout from "../../assets/logout.png";
import arrowDown from "../../assets/arrow-down.png";
import close from "../../assets/close.png";
import menu from "../../assets/menu.png";

interface NavBarProps {
  role?: "user" | "admin";
}

const NavBar = ({ role = "user" }: NavBarProps) => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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
                        {/* <li>
                          <Link to="/profile">PROFILE</Link>
                        </li>
                        <li>
                          <div>
                            <span>APPEARANCE</span>
                            <img src={light} alt="" />
                          </div>
                        </li> */}
                        <li>
                          <div>
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
                <Link to="/setting">SETTING</Link>
              </li>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
