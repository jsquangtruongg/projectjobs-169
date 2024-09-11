import styles from "./style.module.css";
import logo from "../../assets/imgs/logo.png";
import { Outlet, useNavigate } from "react-router-dom";
import {
  ButtonComponent,
  ButtonDropComponent,
} from "../../components/common/ButtonComponent/ButtonComponent";

export const ClientLayout = () => {
   
  return (
    <div className={styles.heading_post}>
      <div className={styles.from_heading_post}>
        <div className={styles.from_heading_padding}>
          <div>
            <div className={styles.Logo}>
              <img src={logo} alt="" />
              <span className={styles.top_search}>Toptimviec.com</span>
            </div>
          </div>
          <div className={styles.header_nav}>
            <ButtonComponent name="Trang Chủ" />
            <ButtonComponent name="Trắc Nghiệm" />
            <ButtonComponent name="Tuyển Dụng" />
            <ButtonDropComponent name="Diễn Đàn" items={["Blog Việc"]} />
            <ButtonComponent name="Hồ Sơ" />
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};
