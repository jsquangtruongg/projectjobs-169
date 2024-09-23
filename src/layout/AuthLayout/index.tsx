import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import { Outlet, Navigate } from "react-router-dom";
import iconBlu from "../../assets/images/backgroud-2.png";
import "./style.scss";
import { useAuth } from "../../hook/useAuth";
function AuthLayout() {
  const { user } = useAuth();
  const accessToken = JSON.parse(
    localStorage.getItem("profile") ?? "{}"
  )?.accessToken;
  if (user || accessToken) return <Navigate to="/home" />;
  return (
    <>
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
    </>
  );
}

export default AuthLayout;
