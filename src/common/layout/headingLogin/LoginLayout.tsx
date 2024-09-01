import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import iconBlu from "../../../assets/imgs/backgroud-2.png";
import styles from "./Style.module.css";
import { Outlet } from "react-router-dom";

function LoginLayout() {
  return (
    <>
      <div className={styles.heading_big}>
        <div className={styles.heading_lef}>
          <VolunteerActivismOutlinedIcon
            style={{ fontSize: 40, color: "white", margin: "30px" }}
          />
          <p className={styles.text_Support}>
            Tìm Kiếm Việc Làm
            <br />
            Hàng Đầu Việt Nam
          </p>
          <img src={iconBlu} alt="" className={styles.background_heading} />
        </div>
        <div className={styles.heading_right}>
          <div className={styles.from_create_account}>
            
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginLayout;
