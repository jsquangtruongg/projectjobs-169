import { AccountCircle } from "@mui/icons-material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import SendIcon from "@mui/icons-material/Send";
import SettingsIcon from "@mui/icons-material/Settings";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  ButtonComponent,
  ButtonDropComponent,
} from "../../components/common/ButtonComponent/ButtonComponent";
import { useState } from "react";
import { useAuth } from "../../hook/useAuth";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import { setUserInit } from "../../redux/actions/userAction";

const PrivateRoute = () => {
  const [showFrom, setShowFrom] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      dispatch(setUserInit(user));
      return;
    }
  }, [user]);
  let isAuthenticated = false;
  if (localStorage.getItem("profile")) {
    const accessToken = JSON.parse(
      localStorage.getItem("profile") ?? ""
    )?.accessToken;
    if (accessToken) {
      isAuthenticated = true;
    }
  }
  const toggleShowFrom = () => {
    setShowFrom(!showFrom);
  };
  const handleLogout = () => {
    localStorage.removeItem("profile");
    navigate("/login");
  };

  return !!isAuthenticated ? (
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
          <div className="account-info">
            <AccountCircle
              sx={{ width: "50px", height: "50px" }}
              onClick={toggleShowFrom}
            />
          </div>
        </div>
        {showFrom && (
          <div className="menu">
            <div className="feature">
              <SettingsIcon className="icon-feature" />
              Cài Đặt
            </div>
            <div className="feature">
              <SendIcon className="icon-feature" />
              Trợ giúp & Hổ Trợ
            </div>
            <div className="feature">
              <MarkEmailUnreadIcon className="icon-feature" />
              Đóng góp ý kiến
            </div>
            <div className="feature" onClick={handleLogout}>
              <LogoutIcon className="icon-feature" />
              Đăng Xuất
            </div>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
