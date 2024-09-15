import { AccountCircle } from "@mui/icons-material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {
  ButtonComponent,
  ButtonDropComponent,
} from "../../components/common/ButtonComponent/ButtonComponent";

const PrivateRoute = () => {
  const navigate = useNavigate();
  let isLogin = false;
  if (localStorage.getItem("profile")) {
    const accessToken = JSON.parse(
      localStorage.getItem("profile") ?? ""
    )?.accessToken;
    if (accessToken) {
      isLogin = true;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("profile");
    navigate("/login");
  };
  return isLogin ? (
    <div className="client-layout">
      <div className="header-container">
        <div className="header-box">
          <div className="logo">
            <img src={logo} alt="" />
            <span>Toptimviec.com</span>
          </div>
          <div className="header-nav">
            <ButtonComponent name="Trang Chủ" />
            <ButtonComponent name="Tuyển Dụng" />
            <ButtonDropComponent name="Diễn Đàn" items={["Blog Việc"]} />
            <ButtonComponent name="Hồ Sơ" />
          </div>
          <div className="account-info" onClick={handleLogout}>
            <AccountCircle sx={{ width: "50px", height: "50px" }} />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
