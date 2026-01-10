import { Outlet } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import Sidebar from "../../components/Sidebar/Sidebar";

const AdminPage = () => {
  return (
    <div className="HomepageOuter">
      <div className="homepageTop">
        <NavBar role="admin"/>
      </div>
        <div className="adminInner">
            <div className="adminInner-left">
                <Sidebar/>
            </div>
            <div className="adminInner-right">
                <Outlet />
            </div>
        </div>
      </div>
  );
};

export default AdminPage;
