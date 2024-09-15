import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import iconBlu from "../../assets/images/backgroud-2.png";
import "./style.scss";
import { Navigate, Outlet } from "react-router-dom";

function AuthLayout() {
  let isLogin = false;
  if (localStorage.getItem("profile")) {
    const accessToken = JSON.parse(
      localStorage.getItem("profile") ?? ""
    )?.accessToken;
    if (accessToken) {
      isLogin = true;
    }
  }
  return (
    <>
      {isLogin ? (
        <div className="auth-layout-container">
          <div className="box-left">
            <VolunteerActivismOutlinedIcon
              style={{ fontSize: 40, color: "white", margin: "30px" }}
            />
            <p>
              Tìm Kiếm Việc Làm
              <br />
              Hàng Đầu Việt Nam
            </p>
            <img src={iconBlu} alt="" />
          </div>
          <div className="box-right">
            <div className="from_create_account">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default AuthLayout;
