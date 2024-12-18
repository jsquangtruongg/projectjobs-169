import logo from "../../assets/images/logo.png";
import { Outlet } from "react-router-dom";
import {
  ButtonComponent,
  ButtonDropComponent,
} from "../../components/common/ButtonComponent/ButtonComponent";
import "./style.scss";
import { AccountCircle } from "@mui/icons-material";
const ClientLayout = () => {
  return (
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
            <AccountCircle sx={{ width: "50px", height: "50px" }} />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default ClientLayout;
