import { AccountCircle, ManageAccounts } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import SendIcon from "@mui/icons-material/Send";
import SettingsIcon from "@mui/icons-material/Settings";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {
  ButtonComponent,
  ButtonDropComponent,
} from "../../components/common/ButtonComponent/ButtonComponent";
import { useAuth } from "../../hook/useAuth";
import { setUserInit } from "../../redux/actions/userAction";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import  './style.scss'
const PrivateRoute = () => {
  const [showFrom, setShowFrom] = useState(false);
  const userState = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, removeUser } = useAuth();

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
    removeUser();
    navigate("/");
  };

  const handleNavigateAdmin = () => {
    navigate("/admin");
  };

  const handleNavigateAppLy = () => {
    navigate("/apply-layout");
  };

  return user || !!isAuthenticated ? (
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
            <Tooltip
              classes={{ tooltip: "user-info-tooltip" }}
              title={
                <div className="user-info-list">
                  {userState?.userData?.roleData &&
                    (userState.userData.roleData.id === 1 ||
                      userState.userData.roleData.id === 2) && (
                      <div className="item" onClick={handleNavigateAdmin}>
                        <ManageAccounts className="item-icon" />
                        Admin
                      </div>
                    )}
                  <div className="item">
                    <SettingsIcon className="item-icon" />
                    Cài Đặt
                  </div>
                  <div className="item">
                    <SendIcon className="item-icon" />
                    Trợ giúp & Hổ Trợ
                  </div>

                  <div
                    className="item"
                    onClick={
                      userState?.userData?.roleData &&
                      (userState.userData.roleData.id === 1 ||
                        userState.userData.roleData.id === 2)
                        ? handleNavigateAppLy
                        : undefined
                    }
                  >
                    <MarkEmailUnreadIcon className="item-icon" />
                    Thông Báo
                  </div>
                  <div className="item" onClick={handleLogout}>
                    <LogoutIcon className="item-icon" />
                    Đăng Xuất
                  </div>
                </div>
              }
            >
              <div className="account-name">
                {" "}
                <span>
                  {userState.userData?.firstName +
                    " " +
                    userState.userData?.lastName}
                </span>
                <div onClick={toggleShowFrom}>
                  {" "}
                  {userState.userData?.avatar && (
                    <img src={userState.userData.avatar as string} alt="user"  className="item-avatar"/>
                  )}
                </div>
              </div>
            </Tooltip>
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
